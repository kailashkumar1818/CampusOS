const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignment.controller');
const { authenticate } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
const { validate } = require('../middleware/validate.middleware');
const upload = require('../middleware/upload.middleware');
const { createAssignmentSchema, gradeSubmissionSchema } = require('../validators/assignment.validator');

router.get('/', authenticate, assignmentController.getAssignments);
router.post(
  '/',
  authenticate,
  authorize('FACULTY', 'ADMIN'),
  upload.single('attachment'),
  validate(createAssignmentSchema),
  assignmentController.createAssignment
);
router.get('/:id/submissions', authenticate, authorize('FACULTY', 'ADMIN'), assignmentController.getAssignmentSubmissions);
router.post('/:id/submit', authenticate, authorize('STUDENT'), upload.single('file'), assignmentController.submitAssignment);
router.patch(
  '/submissions/:submissionId/grade',
  authenticate,
  authorize('FACULTY', 'ADMIN'),
  validate(gradeSubmissionSchema),
  assignmentController.gradeSubmission
);

module.exports = router;

