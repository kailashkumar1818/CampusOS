const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const prisma = require('../config/db');
const { generateToken } = require('../utils/token.util');
const { sendSuccess, sendCreated, sendError } = require('../utils/response.util');
const { sendEmail } = require('../utils/mailer.util');

const register = async (req, res, next) => {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      role,
      phone,
      enrollmentNo,
      courseId,
      semesterId,
      hostelRoom,
      employeeId,
      departmentId,
      designation,
      qualification,
    } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return sendError(res, 'Email already registered', 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName,
          lastName,
          role,
          phone,
        },
      });

      if (role === 'STUDENT') {
        if (!courseId || !semesterId) {
          throw new Error('Course and Semester are required for student registration.');
        }
        const studentEnrollmentNo = enrollmentNo || `STU-${Date.now().toString().slice(-6)}`;
        await tx.student.create({
          data: {
            userId: user.id,
            enrollmentNo: studentEnrollmentNo,
            courseId,
            semesterId,
            hostelRoom,
          },
        });
      } else if (role === 'FACULTY') {
        if (!departmentId) {
          throw new Error('Department is required for faculty registration.');
        }
        const facultyEmployeeId = employeeId || `FAC-${Date.now().toString().slice(-6)}`;
        await tx.faculty.create({
          data: {
            userId: user.id,
            employeeId: facultyEmployeeId,
            departmentId,
            designation: designation || 'Assistant Professor',
            qualification,
          },
        });
      }

      return user;
    });

    const fullUser = await prisma.user.findUnique({
      where: { id: result.id },
      include: {
        studentProfile: { include: { course: true, semester: true } },
        facultyProfile: { include: { department: true } },
      },
    });

    const { password: _, ...userWithoutPassword } = fullUser;
    const token = generateToken({
      id: fullUser.id,
      email: fullUser.email,
      role: fullUser.role,
    });

    return sendCreated(res, 'User registered successfully', {
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, identifier, password } = req.body;
    const loginId = (identifier || email || '').trim();

    let user = null;

    if (loginId.includes('@')) {
      user = await prisma.user.findUnique({
        where: { email: loginId.toLowerCase() },
        include: {
          studentProfile: {
            include: {
              course: true,
              semester: true,
            },
          },
          facultyProfile: {
            include: {
              department: true,
            },
          },
        },
      });
    } else {
      // Lookup by student enrollmentNo / register number
      const student = await prisma.student.findUnique({
        where: { enrollmentNo: loginId },
        include: {
          user: {
            include: {
              studentProfile: { include: { course: true, semester: true } },
              facultyProfile: { include: { department: true } },
            },
          },
        },
      });

      if (student) {
        user = student.user;
      } else {
        // Lookup by faculty employeeId
        const faculty = await prisma.faculty.findUnique({
          where: { employeeId: loginId },
          include: {
            user: {
              include: {
                studentProfile: { include: { course: true, semester: true } },
                facultyProfile: { include: { department: true } },
              },
            },
          },
        });
        if (faculty) {
          user = faculty.user;
        }
      }
    }

    if (!user) {
      return sendError(res, 'Invalid Register Number/Email or password.', 401);
    }

    if (!user.isActive) {
      return sendError(res, 'Account has been deactivated. Please contact administrator.', 403);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendError(res, 'Invalid email or password.', 401);
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const { password: _, ...userWithoutPassword } = user;

    return sendSuccess(res, 'Login successful', {
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res) => {
  const { password: _, ...userWithoutPassword } = req.user;
  return sendSuccess(res, 'Current profile retrieved', userWithoutPassword);
};

const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const {
      firstName,
      lastName,
      phone,
      avatar,
      hostelRoom,
      guardianName,
      guardianPhone,
      designation,
      officeLocation,
    } = req.body;

    const updatedUser = await prisma.$transaction(async (tx) => {
      const user = await tx.user.update({
        where: { id: userId },
        data: {
          ...(firstName && { firstName }),
          ...(lastName && { lastName }),
          ...(phone !== undefined && { phone }),
          ...(avatar !== undefined && { avatar }),
        },
      });

      if (req.user.role === 'STUDENT' && req.user.studentProfile) {
        await tx.student.update({
          where: { userId },
          data: {
            ...(hostelRoom !== undefined && { hostelRoom }),
            ...(guardianName !== undefined && { guardianName }),
            ...(guardianPhone !== undefined && { guardianPhone }),
          },
        });
      } else if (req.user.role === 'FACULTY' && req.user.facultyProfile) {
        await tx.faculty.update({
          where: { userId },
          data: {
            ...(designation && { designation }),
            ...(officeLocation !== undefined && { officeLocation }),
          },
        });
      }

      return user;
    });

    const refreshedUser = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        studentProfile: { include: { course: true, semester: true } },
        facultyProfile: { include: { department: true } },
      },
    });

    const { password: _, ...userWithoutPassword } = refreshedUser;
    return sendSuccess(res, 'Profile updated successfully', userWithoutPassword);
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      // Return success even if not found to prevent user enumeration
      return sendSuccess(res, 'If an account exists with this email, a reset link has been dispatched.');
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        token: resetToken,
        expiresAt,
      },
    });

    const resetUrl = `${process.env.CLIENT_URL || 'http://localhost:5173'}/reset-password?token=${resetToken}`;

    await sendEmail({
      to: user.email,
      subject: 'CampusOS - Password Reset Request',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2>CampusOS Password Reset</h2>
          <p>Hello ${user.firstName},</p>
          <p>You requested a password reset for your CampusOS account. Click the button below to set a new password:</p>
          <a href="${resetUrl}" style="display: inline-block; background: #3b82f6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0;">Reset Password</a>
          <p>This link expires in 60 minutes. If you did not request this, please ignore this email.</p>
        </div>
      `,
    });

    return sendSuccess(res, 'If an account exists with this email, a reset link has been dispatched.');
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;

    const resetRecord = await prisma.passwordResetToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!resetRecord || resetRecord.expiresAt < new Date()) {
      return sendError(res, 'Invalid or expired password reset token.', 400);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.$transaction([
      prisma.user.update({
        where: { id: resetRecord.userId },
        data: { password: hashedPassword },
      }),
      prisma.passwordResetToken.delete({
        where: { id: resetRecord.id },
      }),
    ]);

    return sendSuccess(res, 'Password successfully reset. You can now login with your new credentials.');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getMe,
  updateProfile,
  forgotPassword,
  resetPassword,
};

