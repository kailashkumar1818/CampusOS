const prisma = require('../config/db');
const { sendSuccess, sendCreated, sendError, sendPaginated } = require('../utils/response.util');
const { broadcastEvent, emitToRole } = require('../config/socket');

const createAnnouncement = async (req, res, next) => {
  try {
    const { title, content, targetRole, priority, category } = req.body;
    const authorId = req.user.id;

    let attachmentUrl = null;
    if (req.file) {
      attachmentUrl = `/uploads/${req.file.filename}`;
    }

    const announcement = await prisma.announcement.create({
      data: {
        title,
        content,
        authorId,
        targetRole: targetRole || 'ALL',
        priority: priority || 'NORMAL',
        category: category || 'General',
        attachmentUrl,
      },
      include: {
        author: {
          select: { firstName: true, lastName: true, role: true },
        },
      },
    });

    // Real-time broadcast
    if (announcement.targetRole === 'ALL') {
      broadcastEvent('announcement:new', announcement);
    } else {
      emitToRole(announcement.targetRole, 'announcement:new', announcement);
    }

    return sendCreated(res, 'Announcement created and broadcasted successfully', announcement);
  } catch (error) {
    next(error);
  }
};

const getAnnouncements = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, category, priority } = req.query;
    const userRole = req.user.role;
    const skip = (Number(page) - 1) * Number(limit);

    const where = {
      ...(userRole !== 'ADMIN' && {
        OR: [{ targetRole: 'ALL' }, { targetRole: userRole }],
      }),
      ...(category && { category }),
      ...(priority && { priority }),
    };

    const [total, announcements] = await Promise.all([
      prisma.announcement.count({ where }),
      prisma.announcement.findMany({
        where,
        skip,
        take: Number(limit),
        include: {
          author: { select: { firstName: true, lastName: true, role: true, avatar: true } },
        },
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return sendPaginated(res, 'Announcements fetched successfully', announcements, total, page, limit);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createAnnouncement,
  getAnnouncements,
};

