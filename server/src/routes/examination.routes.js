const express = require('express');
const router = express.Router();
const examinationController = require('../controllers/examination.controller');
const { authenticate } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');

router.get('/', authenticate, examinationController.getExaminations);
router.post('/', authenticate, authorize('ADMIN', 'FACULTY'), examinationController.createExamination);
router.post('/marks/upload', authenticate, authorize('ADMIN', 'FACULTY'), examinationController.uploadMarks);
router.get('/results', authenticate, examinationController.getStudentResults);
router.get('/results/:studentId', authenticate, authorize('ADMIN', 'FACULTY'), examinationController.getStudentResults);

module.exports = router;

