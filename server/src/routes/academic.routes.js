const express = require('express');
const router = express.Router();
const academicController = require('../controllers/academic.controller');
const { authenticate } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
const { validate } = require('../middleware/validate.middleware');
const {
  createDepartmentSchema,
  createCourseSchema,
  createSemesterSchema,
  createSubjectSchema,
  allocateFacultySchema,
} = require('../validators/academic.validator');

// Departments
router.get('/departments', authenticate, academicController.getDepartments);
router.post('/departments', authenticate, authorize('ADMIN'), validate(createDepartmentSchema), academicController.createDepartment);

// Courses
router.get('/courses', authenticate, academicController.getCourses);
router.post('/courses', authenticate, authorize('ADMIN'), validate(createCourseSchema), academicController.createCourse);

// Semesters
router.get('/semesters', authenticate, academicController.getSemesters);
router.post('/semesters', authenticate, authorize('ADMIN'), validate(createSemesterSchema), academicController.createSemester);

// Subjects
router.get('/subjects', authenticate, academicController.getSubjects);
router.post('/subjects', authenticate, authorize('ADMIN'), validate(createSubjectSchema), academicController.createSubject);

// Allocations
router.post('/allocations', authenticate, authorize('ADMIN'), validate(allocateFacultySchema), academicController.allocateFacultyToSubject);
router.delete('/allocations/:subjectId/:facultyId', authenticate, authorize('ADMIN'), academicController.deallocateFacultyFromSubject);

module.exports = router;

