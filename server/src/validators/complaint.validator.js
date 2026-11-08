const { z } = require('zod');

const createComplaintSchema = z.object({
  body: z.object({
    title: z.string().min(3, 'Title is required'),
    description: z.string().min(5, 'Description is required'),
    category: z.enum(['PLUMBING', 'ELECTRICAL', 'CLEANLINESS', 'INTERNET', 'FURNITURE', 'SECURITY', 'OTHER']),
    roomNo: z.string().min(1, 'Hostel Room number is required'),
  }),
});

const updateComplaintStatusSchema = z.object({
  body: z.object({
    status: z.enum(['PENDING', 'IN_PROGRESS', 'RESOLVED', 'REJECTED']),
    resolutionNotes: z.string().optional(),
  }),
});

module.exports = {
  createComplaintSchema,
  updateComplaintStatusSchema,
};

