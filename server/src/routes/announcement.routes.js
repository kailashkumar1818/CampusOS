const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcement.controller');
const { authenticate } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
const upload = require('../middleware/upload.middleware');

router.get('/', authenticate, announcementController.getAnnouncements);
router.post(
  '/',
  authenticate,
  authorize('ADMIN', 'FACULTY'),
  upload.single('attachment'),
  announcementController.createAnnouncement
);

module.exports = router;

