const prisma = require('../config/db');
const { sendSuccess, sendCreated, sendError } = require('../utils/response.util');
const { emitToUser, emitToRole } = require('../config/socket');

const createExamination = async (req, res, next) => {
  try {
    const { name, examType, subjectId, semesterId, examDate, startTime, endTime, totalMarks, roomNo } = req.body;

    const exam = await prisma.examination.create({
      data: {
        name,
        examType: examType || 'MIDTERM',
        subjectId,
        semesterId,
        examDate: new Date(examDate),
        startTime,
        endTime,
        totalMarks: Number(totalMarks) || 100,
        roomNo,
      },
      include: {
        subject: true,
        semester: { include: { course: true } },
      },
    });

    emitToRole('STUDENT', 'notification:new', {
      title: 'Exam Schedule Announced',
      message: `${exam.name} for ${exam.subject.name} is scheduled on ${new Date(examDate).toLocaleDateString()}`,
      link: '/student/exams',
    });

    return sendCreated(res, 'Examination scheduled successfully', exam);
  } catch (error) {
    next(error);
  }
};

const getExaminations = async (req, res, next) => {
  try {
    const { semesterId, subjectId } = req.query;
    const userRole = req.user.role;

    let targetSemesterId = semesterId;
    if (userRole === 'STUDENT' && !targetSemesterId) {
      targetSemesterId = req.user.studentProfile?.semesterId;
    }

    const examinations = await prisma.examination.findMany({
      where: {
        ...(targetSemesterId && { semesterId: targetSemesterId }),
        ...(subjectId && { subjectId }),
      },
      include: {
        subject: true,
        semester: { include: { course: true } },
        _count: { select: { marks: true } },
      },
      orderBy: { examDate: 'asc' },
    });

    return sendSuccess(res, 'Examinations fetched successfully', examinations);
  } catch (error) {
    next(error);
  }
};

const uploadMarks = async (req, res, next) => {
  try {
    const { examinationId, marksRecords } = req.body;

    const exam = await prisma.examination.findUnique({
      where: { id: examinationId },
      include: { subject: true },
    });

    if (!exam) {
      return sendError(res, 'Examination not found', 404);
    }

    const upserts = marksRecords.map((r) =>
      prisma.marks.upsert({
        where: {
          examinationId_studentId: {
            examinationId,
            studentId: r.studentId,
          },
        },
        update: {
          marksObtained: Number(r.marksObtained),
          remarks: r.remarks || null,
        },
        create: {
          examinationId,
          studentId: r.studentId,
          marksObtained: Number(r.marksObtained),
          remarks: r.remarks || null,
        },
      })
    );

    const savedMarks = await prisma.$transaction(upserts);

    // Notify students
    marksRecords.forEach(async (r) => {
      const student = await prisma.student.findUnique({
        where: { id: r.studentId },
        select: { userId: true },
      });
      if (student) {
        emitToUser(student.userId, 'notification:new', {
          title: 'Exam Results Published',
          message: `Results for ${exam.name} (${exam.subject.name}) are now available. Score: ${r.marksObtained}/${exam.totalMarks}`,
          link: '/student/exams',
        });
      }
    });

    return sendSuccess(res, `Marks uploaded for ${savedMarks.length} students`, savedMarks);
  } catch (error) {
    next(error);
  }
};

const getStudentResults = async (req, res, next) => {
  try {
    const studentId = req.user.studentProfile?.id || req.params.studentId;

    if (!studentId) {
      return sendError(res, 'Student profile not found', 404);
    }

    const marks = await prisma.marks.findMany({
      where: { studentId },
      include: {
        examination: {
          include: {
            subject: true,
            semester: true,
          },
        },
      },
      orderBy: { examination: { examDate: 'desc' } },
    });

    // Calculate aggregated metrics
    const totalExams = marks.length;
    let totalMarksObtained = 0;
    let totalMaxMarks = 0;

    marks.forEach((m) => {
      totalMarksObtained += m.marksObtained;
      totalMaxMarks += m.examination.totalMarks;
    });

    const overallPercentage = totalMaxMarks > 0 ? Number(((totalMarksObtained / totalMaxMarks) * 100).toFixed(2)) : 0;

    return sendSuccess(res, 'Student marks fetched successfully', {
      totalExams,
      overallPercentage,
      totalMarksObtained,
      totalMaxMarks,
      results: marks,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createExamination,
  getExaminations,
  uploadMarks,
  getStudentResults,
};

