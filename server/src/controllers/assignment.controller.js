const prisma = require('../config/db');
const { sendSuccess, sendCreated, sendError } = require('../utils/response.util');
const { emitToRoom, emitToUser, emitToRole } = require('../config/socket');

const createAssignment = async (req, res, next) => {
  try {
    const { title, description, subjectId, deadline, maxMarks } = req.body;
    const faculty = req.user.facultyProfile;

    if (!faculty && req.user.role !== 'ADMIN') {
      return sendError(res, 'Only faculty or admins can create assignments', 403);
    }

    const facultyId = faculty ? faculty.id : (await prisma.faculty.findFirst())?.id;

    let attachmentUrl = null;
    let attachmentName = null;
    if (req.file) {
      attachmentUrl = `/uploads/${req.file.filename}`;
      attachmentName = req.file.originalname;
    }

    const assignment = await prisma.assignment.create({
      data: {
        title,
        description,
        subjectId,
        facultyId,
        deadline: new Date(deadline),
        maxMarks: Number(maxMarks) || 100,
        attachmentUrl,
        attachmentName,
      },
      include: {
        subject: true,
        faculty: { include: { user: true } },
      },
    });

    // Notify students enrolled in this subject in real-time
    const enrollments = await prisma.enrollment.findMany({
      where: { subjectId },
      include: { student: true },
    });

    enrollments.forEach((e) => {
      emitToUser(e.student.userId, 'notification:new', {
        title: 'New Assignment Available',
        message: `New assignment: "${title}" posted for ${assignment.subject.name}. Deadline: ${new Date(deadline).toLocaleDateString()}`,
        link: '/student/assignments',
      });
    });

    return sendCreated(res, 'Assignment created successfully', assignment);
  } catch (error) {
    next(error);
  }
};

const getAssignments = async (req, res, next) => {
  try {
    const { subjectId, status } = req.query;
    const userRole = req.user.role;

    if (userRole === 'STUDENT') {
      const student = req.user.studentProfile;
      if (!student) return sendError(res, 'Student profile not found', 404);

      // Get subjects for student's semester
      const subjects = await prisma.subject.findMany({
        where: { semesterId: student.semesterId },
        select: { id: true },
      });
      const subjectIds = subjects.map((s) => s.id);

      const assignments = await prisma.assignment.findMany({
        where: {
          subjectId: subjectId ? subjectId : { in: subjectIds },
        },
        include: {
          subject: true,
          faculty: { include: { user: { select: { firstName: true, lastName: true } } } },
          submissions: {
            where: { studentId: student.id },
          },
        },
        orderBy: { deadline: 'asc' },
      });

      const formatted = assignments.map((a) => {
        const mySubmission = a.submissions[0] || null;
        const isSubmitted = Boolean(mySubmission);
        const isPastDeadline = new Date(a.deadline) < new Date();
        return {
          id: a.id,
          title: a.title,
          description: a.description,
          subject: a.subject,
          faculty: a.faculty,
          deadline: a.deadline,
          maxMarks: a.maxMarks,
          attachmentUrl: a.attachmentUrl,
          attachmentName: a.attachmentName,
          createdAt: a.createdAt,
          isSubmitted,
          isPastDeadline,
          submission: mySubmission,
        };
      });

      return sendSuccess(res, 'Assignments fetched successfully', formatted);
    }

    if (userRole === 'FACULTY') {
      const faculty = req.user.facultyProfile;
      const assignments = await prisma.assignment.findMany({
        where: {
          ...(faculty && { facultyId: faculty.id }),
          ...(subjectId && { subjectId }),
        },
        include: {
          subject: true,
          _count: {
            select: { submissions: true },
          },
        },
        orderBy: { createdAt: 'desc' },
      });

      return sendSuccess(res, 'Faculty assignments fetched successfully', assignments);
    }

    // ADMIN
    const allAssignments = await prisma.assignment.findMany({
      include: {
        subject: true,
        faculty: { include: { user: true } },
        _count: { select: { submissions: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return sendSuccess(res, 'All assignments fetched successfully', allAssignments);
  } catch (error) {
    next(error);
  }
};

const getAssignmentSubmissions = async (req, res, next) => {
  try {
    const { id } = req.params;

    const assignment = await prisma.assignment.findUnique({
      where: { id },
      include: {
        subject: {
          include: {
            semester: {
              include: {
                students: {
                  include: {
                    user: { select: { firstName: true, lastName: true, email: true } },
                  },
                },
              },
            },
          },
        },
        submissions: {
          include: {
            student: {
              include: {
                user: { select: { firstName: true, lastName: true, email: true } },
              },
            },
          },
        },
      },
    });

    if (!assignment) {
      return sendError(res, 'Assignment not found', 404);
    }

    return sendSuccess(res, 'Submissions retrieved successfully', assignment);
  } catch (error) {
    next(error);
  }
};

const submitAssignment = async (req, res, next) => {
  try {
    const { id: assignmentId } = req.params;
    const student = req.user.studentProfile;

    if (!student) {
      return sendError(res, 'Only students can submit assignments', 403);
    }

    if (!req.file) {
      return sendError(res, 'Assignment document file is required', 400);
    }

    const assignment = await prisma.assignment.findUnique({
      where: { id: assignmentId },
    });

    if (!assignment) {
      return sendError(res, 'Assignment not found', 404);
    }

    const isLate = new Date() > new Date(assignment.deadline);
    const fileUrl = `/uploads/${req.file.filename}`;
    const fileName = req.file.originalname;

    const submission = await prisma.submission.upsert({
      where: {
        assignmentId_studentId: {
          assignmentId,
          studentId: student.id,
        },
      },
      update: {
        fileUrl,
        fileName,
        submittedAt: new Date(),
        status: isLate ? 'LATE' : 'SUBMITTED',
      },
      create: {
        assignmentId,
        studentId: student.id,
        fileUrl,
        fileName,
        status: isLate ? 'LATE' : 'SUBMITTED',
      },
    });

    return sendCreated(res, `Assignment submitted successfully ${isLate ? '(Marked as Late)' : ''}`, submission);
  } catch (error) {
    next(error);
  }
};

const gradeSubmission = async (req, res, next) => {
  try {
    const { submissionId } = req.params;
    const { marks, feedback } = req.body;

    const submission = await prisma.submission.update({
      where: { id: submissionId },
      data: {
        marks: Number(marks),
        feedback,
        gradedAt: new Date(),
        status: 'GRADED',
      },
      include: {
        student: { include: { user: true } },
        assignment: true,
      },
    });

    // Notify student in real-time
    emitToUser(submission.student.userId, 'notification:new', {
      title: 'Assignment Graded',
      message: `Your submission for "${submission.assignment.title}" has been graded: ${marks}/${submission.assignment.maxMarks}`,
      link: '/student/assignments',
    });

    return sendSuccess(res, 'Submission graded successfully', submission);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createAssignment,
  getAssignments,
  getAssignmentSubmissions,
  submitAssignment,
  gradeSubmission,
};

