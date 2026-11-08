const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analytics.controller');
const { authenticate } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');

router.get('/admin', authenticate, authorize('ADMIN'), analyticsController.getAdminDashboardAnalytics);
router.get('/faculty', authenticate, authorize('FACULTY'), analyticsController.getFacultyDashboardMetrics);

module.exports = router;

