const prisma = require('../config/db');
const { sendSuccess, sendCreated, sendError, sendPaginated } = require('../utils/response.util');
const { emitToUser, emitToRole } = require('../config/socket');

const createComplaint = async (req, res, next) => {
  try {
    const { title, description, category, roomNo } = req.body;
    const student = req.user.studentProfile;

    if (!student) {
      return sendError(res, 'Only students can submit hostel complaints', 403);
    }

    const complaint = await prisma.hostelComplaint.create({
      data: {
        studentId: student.id,
        title,
        description,
        category,
        roomNo: roomNo || student.hostelRoom || 'N/A',
      },
      include: {
        student: {
          include: {
            user: { select: { firstName: true, lastName: true, email: true } },
          },
        },
      },
    });

    // Notify admins in real-time
    emitToRole('ADMIN', 'notification:new', {
      title: 'New Hostel Grievance Filed',
      message: `Room ${complaint.roomNo} - ${category}: "${title}" by ${complaint.student.user.firstName}`,
      link: '/admin/complaints',
    });

    return sendCreated(res, 'Hostel complaint registered successfully', complaint);
  } catch (error) {
    next(error);
  }
};

const getComplaints = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status, category } = req.query;
    const userRole = req.user.role;
    const skip = (Number(page) - 1) * Number(limit);

    const where = {
      ...(userRole === 'STUDENT' && { studentId: req.user.studentProfile?.id }),
      ...(status && { status }),
      ...(category && { category }),
    };

    const [total, complaints] = await Promise.all([
      prisma.hostelComplaint.count({ where }),
      prisma.hostelComplaint.findMany({
        where,
        skip,
        take: Number(limit),
        include: {
          student: {
            include: {
              user: { select: { firstName: true, lastName: true, email: true, phone: true } },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return sendPaginated(res, 'Complaints retrieved successfully', complaints, total, page, limit);
  } catch (error) {
    next(error);
  }
};

const updateComplaintStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, resolutionNotes } = req.body;

    const complaint = await prisma.hostelComplaint.update({
      where: { id },
      data: {
        status,
        ...(resolutionNotes && { resolutionNotes }),
      },
      include: {
        student: {
          include: {
            user: true,
          },
        },
      },
    });

    // Notify student in real-time
    emitToUser(complaint.student.userId, 'notification:new', {
      title: 'Hostel Complaint Status Updated',
      message: `Your complaint for Room ${complaint.roomNo} ("${complaint.title}") status changed to: ${status}`,
      link: '/student/hostel',
    });

    return sendSuccess(res, 'Complaint status updated successfully', complaint);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createComplaint,
  getComplaints,
  updateComplaintStatus,
};

