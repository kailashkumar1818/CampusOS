const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authenticate } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');

router.get('/students', authenticate, authorize('ADMIN', 'FACULTY'), userController.getStudents);
router.get('/faculties', authenticate, authorize('ADMIN'), userController.getFaculties);
router.patch('/:id/toggle-status', authenticate, authorize('ADMIN'), userController.toggleUserStatus);

module.exports = router;

