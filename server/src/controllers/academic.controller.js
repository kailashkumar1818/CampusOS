const prisma = require('../config/db');
const { sendSuccess, sendCreated, sendError } = require('../utils/response.util');

// DEPARTMENTS
const getDepartments = async (req, res, next) => {
  try {
    const departments = await prisma.department.findMany({
      include: {
        _count: {
          select: { courses: true, faculties: true, subjects: true },
        },
      },
      orderBy: { name: 'asc' },
    });
    return sendSuccess(res, 'Departments fetched successfully', departments);
  } catch (error) {
    next(error);
  }
};

const createDepartment = async (req, res, next) => {
  try {
    const { code, name, description } = req.body;
    const department = await prisma.department.create({
      data: { code: code.toUpperCase(), name, description },
    });
    return sendCreated(res, 'Department created successfully', department);
  } catch (error) {
    next(error);
  }
};

// COURSES
const getCourses = async (req, res, next) => {
  try {
    const { departmentId } = req.query;
    const courses = await prisma.course.findMany({
      where: departmentId ? { departmentId } : {},
      include: {
        department: true,
        _count: { select: { semesters: true, students: true } },
      },
      orderBy: { name: 'asc' },
    });
    return sendSuccess(res, 'Courses fetched successfully', courses);
  } catch (error) {
    next(error);
  }
};

const createCourse = async (req, res, next) => {
  try {
    const { code, name, departmentId, durationYears } = req.body;
    const course = await prisma.course.create({
      data: { code: code.toUpperCase(), name, departmentId, durationYears: Number(durationYears) || 4 },
      include: { department: true },
    });
    return sendCreated(res, 'Course created successfully', course);
  } catch (error) {
    next(error);
  }
};

// SEMESTERS
const getSemesters = async (req, res, next) => {
  try {
    const { courseId } = req.query;
    const semesters = await prisma.semester.findMany({
      where: courseId ? { courseId } : {},
      include: {
        course: true,
        _count: { select: { subjects: true, students: true } },
      },
      orderBy: [{ semesterNo: 'asc' }, { academicYear: 'desc' }],
    });
    return sendSuccess(res, 'Semesters fetched successfully', semesters);
  } catch (error) {
    next(error);
  }
};

const createSemester = async (req, res, next) => {
  try {
    const { semesterNo, academicYear, courseId } = req.body;
    const semester = await prisma.semester.create({
      data: { semesterNo: Number(semesterNo), academicYear, courseId },
      include: { course: true },
    });
    return sendCreated(res, 'Semester created successfully', semester);
  } catch (error) {
    next(error);
  }
};

// SUBJECTS
const getSubjects = async (req, res, next) => {
  try {
    const { departmentId, semesterId, facultyId } = req.query;

    const where = {
      ...(departmentId && { departmentId }),
      ...(semesterId && { semesterId }),
      ...(facultyId && {
        facultyAlloc: {
          some: { facultyId },
        },
      }),
    };

    const subjects = await prisma.subject.findMany({
      where,
      include: {
        department: true,
        semester: { include: { course: true } },
        facultyAlloc: {
          include: {
            faculty: {
              include: { user: { select: { firstName: true, lastName: true, email: true } } },
            },
          },
        },
        _count: {
          select: { enrollments: true, assignments: true },
        },
      },
      orderBy: { code: 'asc' },
    });

    return sendSuccess(res, 'Subjects fetched successfully', subjects);
  } catch (error) {
    next(error);
  }
};

const createSubject = async (req, res, next) => {
  try {
    const { code, name, credits, departmentId, semesterId } = req.body;
    const subject = await prisma.subject.create({
      data: {
        code: code.toUpperCase(),
        name,
        credits: Number(credits) || 3,
        departmentId,
        semesterId,
      },
      include: { department: true, semester: true },
    });
    return sendCreated(res, 'Subject created successfully', subject);
  } catch (error) {
    next(error);
  }
};

// FACULTY ALLOCATION
const allocateFacultyToSubject = async (req, res, next) => {
  try {
    const { subjectId, facultyId } = req.body;

    const allocation = await prisma.subjectFaculty.upsert({
      where: {
        subjectId_facultyId: { subjectId, facultyId },
      },
      update: {},
      create: { subjectId, facultyId },
      include: {
        subject: true,
        faculty: { include: { user: true } },
      },
    });

    return sendCreated(res, 'Faculty allocated to subject successfully', allocation);
  } catch (error) {
    next(error);
  }
};

const deallocateFacultyFromSubject = async (req, res, next) => {
  try {
    const { subjectId, facultyId } = req.params;

    await prisma.subjectFaculty.delete({
      where: {
        subjectId_facultyId: { subjectId, facultyId },
      },
    });

    return sendSuccess(res, 'Faculty deallocated from subject successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDepartments,
  createDepartment,
  getCourses,
  createCourse,
  getSemesters,
  createSemester,
  getSubjects,
  createSubject,
  allocateFacultyToSubject,
  deallocateFacultyFromSubject,
};

