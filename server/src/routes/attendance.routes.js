const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendance.controller');
const { authenticate } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
const { validate } = require('../middleware/validate.middleware');
const { markAttendanceSchema } = require('../validators/attendance.validator');

router.post('/mark', authenticate, authorize('FACULTY', 'ADMIN'), validate(markAttendanceSchema), attendanceController.markAttendance);
router.get('/class-roster', authenticate, authorize('FACULTY', 'ADMIN'), attendanceController.getSubjectAttendanceForClass);
router.get('/analytics', authenticate, attendanceController.getStudentAttendanceAnalytics);
router.get('/analytics/:studentId', authenticate, authorize('ADMIN', 'FACULTY'), attendanceController.getStudentAttendanceAnalytics);

module.exports = router;

