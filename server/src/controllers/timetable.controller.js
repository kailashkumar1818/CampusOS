const prisma = require('../config/db');
const { sendSuccess, sendCreated, sendError } = require('../utils/response.util');

const createTimetableSlot = async (req, res, next) => {
  try {
    const { subjectId, facultyId, semesterId, dayOfWeek, startTime, endTime, roomNo } = req.body;

    // Check for room collision or faculty collision at the same slot
    const existingFacultyConflict = await prisma.timetable.findFirst({
      where: {
        facultyId,
        dayOfWeek,
        startTime,
        endTime,
      },
    });

    if (existingFacultyConflict) {
      return sendError(res, 'Faculty already has a class scheduled at this day and time.', 409);
    }

    const slot = await prisma.timetable.create({
      data: {
        subjectId,
        facultyId,
        semesterId,
        dayOfWeek,
        startTime,
        endTime,
        roomNo,
      },
      include: {
        subject: true,
        faculty: { include: { user: true } },
        semester: true,
      },
    });

    return sendCreated(res, 'Timetable slot created successfully', slot);
  } catch (error) {
    next(error);
  }
};

const getTimetable = async (req, res, next) => {
  try {
    const { semesterId, facultyId, dayOfWeek } = req.query;
    const userRole = req.user.role;

    let targetSemesterId = semesterId;
    let targetFacultyId = facultyId;

    if (userRole === 'STUDENT' && !targetSemesterId) {
      targetSemesterId = req.user.studentProfile?.semesterId;
    } else if (userRole === 'FACULTY' && !targetFacultyId) {
      targetFacultyId = req.user.facultyProfile?.id;
    }

    const where = {
      ...(targetSemesterId && { semesterId: targetSemesterId }),
      ...(targetFacultyId && { facultyId: targetFacultyId }),
      ...(dayOfWeek && { dayOfWeek }),
    };

    const slots = await prisma.timetable.findMany({
      where,
      include: {
        subject: true,
        faculty: {
          include: {
            user: { select: { firstName: true, lastName: true } },
          },
        },
        semester: true,
      },
      orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }],
    });

    return sendSuccess(res, 'Timetable retrieved successfully', slots);
  } catch (error) {
    next(error);
  }
};

const deleteTimetableSlot = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.timetable.delete({ where: { id } });
    return sendSuccess(res, 'Timetable slot removed successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTimetableSlot,
  getTimetable,
  deleteTimetableSlot,
};

