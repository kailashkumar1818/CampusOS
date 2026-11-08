const { z } = require('zod');

const markAttendanceSchema = z.object({
  body: z.object({
    subjectId: z.string().uuid('Valid subject ID is required'),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be formatted as YYYY-MM-DD'),
    records: z.array(
      z.object({
        studentId: z.string().uuid(),
        status: z.enum(['PRESENT', 'ABSENT', 'LATE', 'EXCUSED']),
        remarks: z.string().optional(),
      })
    ).min(1, 'At least one student record is required'),
  }),
});

module.exports = {
  markAttendanceSchema,
};

