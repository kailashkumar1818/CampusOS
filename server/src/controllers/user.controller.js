const prisma = require('../config/db');
const bcrypt = require('bcryptjs');
const { sendSuccess, sendCreated, sendError, sendPaginated } = require('../utils/response.util');

const getStudents = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = '', departmentId, courseId, semesterId } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where = {
      ...(courseId && { courseId }),
      ...(semesterId && { semesterId }),
      ...(departmentId && {
        course: {
          departmentId,
        },
      }),
      ...(search && {
        OR: [
          { enrollmentNo: { contains: search, mode: 'insensitive' } },
          { user: { firstName: { contains: search, mode: 'insensitive' } } },
          { user: { lastName: { contains: search, mode: 'insensitive' } } },
          { user: { email: { contains: search, mode: 'insensitive' } } },
        ],
      }),
    };

    const [total, students] = await Promise.all([
      prisma.student.count({ where }),
      prisma.student.findMany({
        where,
        skip,
        take: Number(limit),
        include: {
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
              phone: true,
              avatar: true,
              isActive: true,
            },
          },
          course: {
            include: { department: true },
          },
          semester: true,
        },
        orderBy: { user: { lastName: 'asc' } },
      }),
    ]);

    return sendPaginated(res, 'Students fetched successfully', students, total, page, limit);
  } catch (error) {
    next(error);
  }
};

const getFaculties = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = '', departmentId } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where = {
      ...(departmentId && { departmentId }),
      ...(search && {
        OR: [
          { employeeId: { contains: search, mode: 'insensitive' } },
          { designation: { contains: search, mode: 'insensitive' } },
          { user: { firstName: { contains: search, mode: 'insensitive' } } },
          { user: { lastName: { contains: search, mode: 'insensitive' } } },
          { user: { email: { contains: search, mode: 'insensitive' } } },
        ],
      }),
    };

    const [total, faculties] = await Promise.all([
      prisma.faculty.count({ where }),
      prisma.faculty.findMany({
        where,
        skip,
        take: Number(limit),
        include: {
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
              phone: true,
              avatar: true,
              isActive: true,
            },
          },
          department: true,
          subjectAllocations: {
            include: {
              subject: true,
            },
          },
        },
        orderBy: { user: { lastName: 'asc' } },
      }),
    ]);

    return sendPaginated(res, 'Faculties fetched successfully', faculties, total, page, limit);
  } catch (error) {
    next(error);
  }
};

const toggleUserStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      return sendError(res, 'User not found', 404);
    }

    const updated = await prisma.user.update({
      where: { id },
      data: { isActive: !user.isActive },
      select: { id: true, email: true, isActive: true },
    });

    return sendSuccess(res, `User status updated to ${updated.isActive ? 'active' : 'inactive'}`, updated);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStudents,
  getFaculties,
  toggleUserStatus,
};

