const prisma = require('../config/db');
const { sendSuccess } = require('../utils/response.util');

const getAdminDashboardAnalytics = async (req, res, next) => {
  try {
    const [
      totalStudents,
      totalFaculties,
      totalDepartments,
      totalCourses,
      complaintStats,
      attendanceRecords,
      departmentsDistribution,
      recentAnnouncements,
    ] = await Promise.all([
      prisma.student.count(),
      prisma.faculty.count(),
      prisma.department.count(),
      prisma.course.count(),
      prisma.hostelComplaint.groupBy({
        by: ['status'],
        _count: { id: true },
      }),
      prisma.attendance.groupBy({
        by: ['status'],
        _count: { id: true },
      }),
      prisma.department.findMany({
        select: {
          code: true,
          name: true,
          courses: {
            select: {
              _count: { select: { students: true } },
            },
          },
        },
      }),
      prisma.announcement.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    // Format department distribution
    const departmentChartData = departmentsDistribution.map((d) => {
      const studentCount = d.courses.reduce((acc, c) => acc + c._count.students, 0);
      return {
        name: d.code,
        fullName: d.name,
        students: studentCount,
      };
    });

    // Format complaint counts
    const complaintBreakdown = {
      PENDING: 0,
      IN_PROGRESS: 0,
      RESOLVED: 0,
      REJECTED: 0,
    };
    complaintStats.forEach((c) => {
      complaintBreakdown[c.status] = c._count.id;
    });

    // Format attendance counts
    const attendanceBreakdown = {
      PRESENT: 0,
      ABSENT: 0,
      LATE: 0,
      EXCUSED: 0,
    };
    attendanceRecords.forEach((a) => {
      attendanceBreakdown[a.status] = a._count.id;
    });

    return sendSuccess(res, 'Admin analytics compiled successfully', {
      stats: {
        totalStudents,
        totalFaculties,
        totalDepartments,
        totalCourses,
      },
      departmentDistribution: departmentChartData,
      complaintBreakdown,
      attendanceBreakdown,
      recentAnnouncements,
    });
  } catch (error) {
    next(error);
  }
};

const getFacultyDashboardMetrics = async (req, res, next) => {
  try {
    const faculty = req.user.facultyProfile;
    if (!faculty) {
      return sendSuccess(res, 'Faculty metrics', {});
    }

    const [allocatedSubjects, activeAssignments, pendingGrading] = await Promise.all([
      prisma.subjectFaculty.findMany({
        where: { facultyId: faculty.id },
        include: { subject: { include: { semester: true } } },
      }),
      prisma.assignment.findMany({
        where: { facultyId: faculty.id },
        include: { _count: { select: { submissions: true } } },
      }),
      prisma.submission.count({
        where: {
          assignment: { facultyId: faculty.id },
          status: 'SUBMITTED',
        },
      }),
    ]);

    return sendSuccess(res, 'Faculty metrics compiled successfully', {
      allocatedSubjectsCount: allocatedSubjects.length,
      activeAssignmentsCount: activeAssignments.length,
      pendingGradingCount: pendingGrading,
      subjects: allocatedSubjects.map((s) => s.subject),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAdminDashboardAnalytics,
  getFacultyDashboardMetrics,
};

