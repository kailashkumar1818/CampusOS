const { z } = require('zod');

const registerSchema = z.object({
  body: z.object({
    email: z.string().email('Valid email is required'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    firstName: z.string().min(2, 'First name is required'),
    lastName: z.string().min(2, 'Last name is required'),
    role: z.enum(['STUDENT', 'FACULTY', 'ADMIN']),
    phone: z.string().optional(),
    // Specific student fields
    enrollmentNo: z.string().optional(),
    courseId: z.string().optional(),
    semesterId: z.string().optional(),
    hostelRoom: z.string().optional(),
    // Specific faculty fields
    employeeId: z.string().optional(),
    departmentId: z.string().optional(),
    designation: z.string().optional(),
    qualification: z.string().optional(),
  }),
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().optional(),
    identifier: z.string().optional(),
    password: z.string().min(1, 'Password is required'),
  }).refine((data) => data.email || data.identifier, {
    message: 'Register Number or Email is required',
    path: ['identifier'],
  }),
});

const forgotPasswordSchema = z.object({
  body: z.object({
    email: z.string().email('Valid email is required'),
  }),
});

const resetPasswordSchema = z.object({
  body: z.object({
    token: z.string().min(1, 'Token is required'),
    newPassword: z.string().min(6, 'Password must be at least 6 characters'),
  }),
});

const updateProfileSchema = z.object({
  body: z.object({
    firstName: z.string().min(2).optional(),
    lastName: z.string().min(2).optional(),
    phone: z.string().optional(),
    avatar: z.string().optional(),
    // Student specifics
    hostelRoom: z.string().optional(),
    guardianName: z.string().optional(),
    guardianPhone: z.string().optional(),
    // Faculty specifics
    designation: z.string().optional(),
    officeLocation: z.string().optional(),
  }),
});

module.exports = {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  updateProfileSchema,
};

