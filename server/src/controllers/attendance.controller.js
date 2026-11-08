const prisma = require('../config/db');
const { sendSuccess, sendCreated, sendError } = require('../utils/response.util');
const { emitToUser } = require('../config/socket');

const markAttendance = async (req, res, next) => {
  try {
    const { subjectId, date, records } = req.body;
    const faculty = req.user.facultyProfile;

    if (!faculty && req.user.role !== 'ADMIN') {
      return sendError(res, 'Only faculty or admins can mark attendance', 403);
    }

    const facultyId = faculty ? faculty.id : (await prisma.faculty.findFirst())?.id;
    const sessionDate = new Date(date);

    const upsertPromises = records.map((record) => {
      return prisma.attendance.upsert({
        where: {
          studentId_subjectId_date: {
            studentId: record.studentId,
            subjectId,
            date: sessionDate,
          },
        },
        update: {
          status: record.status,
          remarks: record.remarks || null,
          facultyId,
        },
        create: {
          studentId: record.studentId,
          subjectId,
          facultyId,
          date: sessionDate,
          status: record.status,
          remarks: record.remarks || null,
        },
      });
    });

    const results = await prisma.$transaction(upsertPromises);

    // Notify students in real-time
    const subject = await prisma.subject.findUnique({ where: { id: subjectId } });
    records.forEach(async (r) => {
      const student = await prisma.student.findUnique({
        where: { id: r.studentId },
        select: { userId: true },
      });
      if (student) {
        emitToUser(student.userId, 'attendance:updated', {
          subjectName: subject?.name || 'Class',
          date,
          status: r.status,
        });
      }
    });

    return sendCreated(res, `Attendance marked successfully for ${results.length} students`, results);
  } catch (error) {
    next(error);
  }
};

const getSubjectAttendanceForClass = async (req, res, next) => {
  try {
    const { subjectId, date } = req.query;

    if (!subjectId) {
      return sendError(res, 'Subject ID is required', 400);
    }

    const subject = await prisma.subject.findUnique({
      where: { id: subjectId },
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
    });

    if (!subject) {
      return sendError(res, 'Subject not found', 404);
    }

    // Existing attendance records for this date
    let records = [];
    if (date) {
      records = await prisma.attendance.findMany({
        where: {
          subjectId,
          date: new Date(date),
        },
      });
    }

    const attendanceMap = new Map();
    records.forEach((r) => attendanceMap.set(r.studentId, r));

    // Merge student roster with attendance status
    const studentRoster = subject.semester.students.map((student) => {
      const record = attendanceMap.get(student.id);
      return {
        studentId: student.id,
        enrollmentNo: student.enrollmentNo,
        name: `${student.user.firstName} ${student.user.lastName}`,
        status: record ? record.status : 'PRESENT', // default suggested status
        remarks: record ? record.remarks : '',
        marked: Boolean(record),
      };
    });

    return sendSuccess(res, 'Class roster with attendance fetched successfully', {
      subject,
      students: studentRoster,
    });
  } catch (error) {
    next(error);
  }
};

const getStudentAttendanceAnalytics = async (req, res, next) => {
  try {
    const studentId = req.user.studentProfile?.id || req.params.studentId;

    if (!studentId) {
      return sendError(res, 'Student profile not found', 404);
    }

    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: {
        semester: {
          include: {
            subjects: true,
          },
        },
      },
    });

    if (!student) {
      return sendError(res, 'Student not found', 404);
    }

    // Fetch all attendance records for student
    const allRecords = await prisma.attendance.findMany({
      where: { studentId },
      include: {
        subject: true,
      },
      orderBy: { date: 'desc' },
    });

    // Group by subject
    const subjectStats = student.semester.subjects.map((sub) => {
      const subRecords = allRecords.filter((r) => r.subjectId === sub.id);
      const totalSessions = subRecords.length;
      const presentSessions = subRecords.filter((r) => r.status === 'PRESENT' || r.status === 'EXCUSED').length;
      const absentSessions = subRecords.filter((r) => r.status === 'ABSENT').length;
      const lateSessions = subRecords.filter((r) => r.status === 'LATE').length;

      const percentage = totalSessions > 0 ? Number(((presentSessions / totalSessions) * 100).toFixed(1)) : 100;
      const isShortage = percentage < 75.0 && totalSessions >= 5;

      return {
        subjectId: sub.id,
        subjectCode: sub.code,
        subjectName: sub.name,
        credits: sub.credits,
        totalSessions,
        presentSessions,
        absentSessions,
        lateSessions,
        percentage,
        isShortage,
      };
    });

    const totalLectures = allRecords.length;
    const totalPresent = allRecords.filter((r) => r.status === 'PRESENT' || r.status === 'EXCUSED').length;
    const overallPercentage = totalLectures > 0 ? Number(((totalPresent / totalLectures) * 100).toFixed(1)) : 100;

    return sendSuccess(res, 'Attendance analytics calculated successfully', {
      overallPercentage,
      totalLectures,
      totalPresent,
      totalAbsent: totalLectures - totalPresent,
      isOverallShortage: overallPercentage < 75.0 && totalLectures >= 10,
      subjectBreakdown: subjectStats,
      recentHistory: allRecords.slice(0, 15),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  markAttendance,
  getSubjectAttendanceForClass,
  getStudentAttendanceAnalytics,
};

