const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const academicRoutes = require('./academic.routes');
const attendanceRoutes = require('./attendance.routes');
const assignmentRoutes = require('./assignment.routes');
const examinationRoutes = require('./examination.routes');
const timetableRoutes = require('./timetable.routes');
const announcementRoutes = require('./announcement.routes');
const complaintRoutes = require('./complaint.routes');
const forumRoutes = require('./forum.routes');
const analyticsRoutes = require('./analytics.routes');
const notificationRoutes = require('./notification.routes');
const aiRoutes = require('./ai.routes');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/academic', academicRoutes);
router.use('/attendance', attendanceRoutes);
router.use('/assignments', assignmentRoutes);
router.use('/examinations', examinationRoutes);
router.use('/timetable', timetableRoutes);
router.use('/announcements', announcementRoutes);
router.use('/complaints', complaintRoutes);
router.use('/forum', forumRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/notifications', notificationRoutes);
router.use('/ai', aiRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    service: 'CampusOS API Gateway',
  });
});

module.exports = router;

