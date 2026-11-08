const { z } = require('zod');

const createAssignmentSchema = z.object({
  body: z.object({
    title: z.string().min(3, 'Title is required'),
    description: z.string().min(5, 'Description is required'),
    subjectId: z.string().uuid('Valid subject ID is required'),
    deadline: z.string().refine((val) => !isNaN(Date.parse(val)), 'Valid deadline ISO date is required'),
    maxMarks: z.coerce.number().min(1).default(100),
  }),
});

const gradeSubmissionSchema = z.object({
  body: z.object({
    marks: z.number().min(0, 'Marks must be positive'),
    feedback: z.string().optional(),
  }),
});

module.exports = {
  createAssignmentSchema,
  gradeSubmissionSchema,
};

