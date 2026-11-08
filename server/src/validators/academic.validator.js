const { z } = require('zod');

const createDepartmentSchema = z.object({
  body: z.object({
    code: z.string().min(2, 'Department code is required (e.g. CSE)'),
    name: z.string().min(3, 'Department name is required'),
    description: z.string().optional(),
  }),
});

const createCourseSchema = z.object({
  body: z.object({
    code: z.string().min(2, 'Course code is required (e.g. BTECH-CSE)'),
    name: z.string().min(3, 'Course name is required'),
    departmentId: z.string().uuid('Valid department ID is required'),
    durationYears: z.number().int().min(1).max(6).default(4),
  }),
});

const createSemesterSchema = z.object({
  body: z.object({
    semesterNo: z.number().int().min(1).max(12),
    academicYear: z.string().min(4, 'e.g. 2026-2027'),
    courseId: z.string().uuid('Valid course ID is required'),
  }),
});

const createSubjectSchema = z.object({
  body: z.object({
    code: z.string().min(2, 'Subject code is required'),
    name: z.string().min(2, 'Subject name is required'),
    credits: z.number().int().min(1).max(10).default(3),
    departmentId: z.string().uuid(),
    semesterId: z.string().uuid(),
  }),
});

const allocateFacultySchema = z.object({
  body: z.object({
    subjectId: z.string().uuid('Valid subject ID is required'),
    facultyId: z.string().uuid('Valid faculty ID is required'),
  }),
});

const enrollStudentSchema = z.object({
  body: z.object({
    studentId: z.string().uuid(),
    subjectId: z.string().uuid(),
    semesterId: z.string().uuid(),
    academicYear: z.string().min(4),
  }),
});

module.exports = {
  createDepartmentSchema,
  createCourseSchema,
  createSemesterSchema,
  createSubjectSchema,
  allocateFacultySchema,
  enrollStudentSchema,
};

