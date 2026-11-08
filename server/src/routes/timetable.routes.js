const express = require('express');
const router = express.Router();
const timetableController = require('../controllers/timetable.controller');
const { authenticate } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');

router.get('/', authenticate, timetableController.getTimetable);
router.post('/', authenticate, authorize('ADMIN'), timetableController.createTimetableSlot);
router.delete('/:id', authenticate, authorize('ADMIN'), timetableController.deleteTimetableSlot);

module.exports = router;

