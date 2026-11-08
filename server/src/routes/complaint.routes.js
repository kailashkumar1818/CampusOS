const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaint.controller');
const { authenticate } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
const { validate } = require('../middleware/validate.middleware');
const { createComplaintSchema, updateComplaintStatusSchema } = require('../validators/complaint.validator');

router.get('/', authenticate, complaintController.getComplaints);
router.post('/', authenticate, authorize('STUDENT'), validate(createComplaintSchema), complaintController.createComplaint);
router.patch(
  '/:id/status',
  authenticate,
  authorize('ADMIN'),
  validate(updateComplaintStatusSchema),
  complaintController.updateComplaintStatus
);

module.exports = router;

