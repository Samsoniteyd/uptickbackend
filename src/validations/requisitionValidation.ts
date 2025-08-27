import { z } from 'zod';
import { RequisitionStatus, RequisitionPriority } from '../types';
// Phone number validation regex
// export const phoneRegex = /^[0-9+\-\s()]{10,15}$/;

// // Measurements schema
// export const measurementsSchema = z.object({
//   chest: z.number().min(0).max(200).nullable().optional(),
//   shoulders: z.number().min(0).max(100).nullable().optional(),
//   sleeveLengthLong: z.number().min(0).max(100).nullable().optional(),
//   sleeveLengthShort: z.number().min(0).max(100).nullable().optional(),
//   topLength: z.number().min(0).max(200).nullable().optional(),
//   neck: z.number().min(0).max(50).nullable().optional(),
//   tommy: z.number().min(0).max(200).nullable().optional(),
//   hip: z.number().min(0).max(200).nullable().optional(),
//   waist: z.number().min(0).max(200).nullable().optional(),
//   length: z.number().min(0).max(200).nullable().optional(),
//   lap: z.number().min(0).max(200).nullable().optional(),
//   base: z.number().min(0).max(200).nullable().optional(),
//   agbadaLength: z.number().min(0).max(200).nullable().optional(),
//   agbadaSleeve: z.number().min(0).max(100).nullable().optional(),
// }).default({});

// // Contact info schema
// const contactInfoSchema = z.object({
//   phone: z.string().regex(phoneRegex).optional().or(z.literal('')),
//   email: z.string().email().optional().or(z.literal('')),
// }).refine(
//   (data) => data.phone || data.email,
//   {
//     message: "Either phone or email must be provided in contactInfo",
//     path: ["contactInfo"]
//   }
// ).default({}).optional();


// export const noteSchema = z.object({
//   text: z.string().min(1, "Note text is required").optional(),
//   addedBy: z.string().min(1, "Added by is required").optional(),
// });
// // Create requisition schema
// export const createRequisitionSchema = z.object({
//   name: z.string().min(2).max(100),
//   description: z.string().max(500).optional().or(z.literal('')),
//   measurements: measurementsSchema.optional(),
//   contactInfo: contactInfoSchema.optional(),
// status: z.preprocess(
//     (val) => (typeof val === "string" ? val.toUpperCase() : val),
//     z.nativeEnum(RequisitionStatus).optional()
//   ).optional(),
//   priority: z.preprocess(
//     (val) => (typeof val === "string" ? val.toUpperCase() : val),
//     z.nativeEnum(RequisitionPriority).optional()
//   ).optional(),
//   dueDate: z.preprocess(
//     (val) => {
//       if (typeof val === "string") {
//         const d = new Date(val);
//         return isNaN(d.getTime()) ? undefined : d;
//       }
//       return undefined;
//     },
//     z.date().optional()
//   ),
//   notes: z.array(noteSchema).optional(),
// });

// // Update requisition schema
// export const updateRequisitionSchema = z.object({
//   name: z.string().min(2).max(100).optional(),
//   description: z.string().max(500).optional().or(z.literal('')),
//   measurements: measurementsSchema.optional(),
//   contactInfo: contactInfoSchema.optional(),
//   priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
//   status:z.enum(['pending', 'in_progress', 'completed', 'cancelled']).optional(),
//     notes: z.array(noteSchema).optional(),

//   dueDate: z.string().datetime({ offset: true }).nullable().optional().or(z.literal('')).optional(),
// }).refine(
//   (data) => Object.keys(data).length > 0,
//   {
//     message: "At least one field must be provided for update",
//   }
// );
 
// // For Express middleware usage, you might want to wrap them in body objects
// export const createRequisitionBodySchema = z.object({
//   body: createRequisitionSchema.optional()
// });

// export const updateRequisitionBodySchema = z.object({
//   body: updateRequisitionSchema.optional()
// });

//  export const requisitionSchema = z.object({
//   name: z.string().min(2).max(100),
//   description: z.string().max(500).optional(),
//   measurements: measurementsSchema.optional(),
//   contactInfo: contactInfoSchema.optional(),
//   status: z.preprocess(
//     (val) => (typeof val === "string" ? val.toUpperCase() : val),
//     z.nativeEnum(RequisitionStatus)
//   ).optional(),
//   priority: z.preprocess(
//     (val) => (typeof val === "string" ? val.toUpperCase() : val),
//     z.nativeEnum(RequisitionPriority)
//   ).optional(),
//   dueDate: z.preprocess(
//     (val) => {
//       if (typeof val === "string") {
//         const d = new Date(val);
//         return isNaN(d.getTime()) ? undefined : d;
//       }
//       return undefined;
//     },
//     z.date().optional()
//   ).optional(),
//   notes: z.array(noteSchema).optional(),
// });



// Phone number validation regex
export const phoneRegex = /^[0-9+\-\s()]{10,15}$/;

// Measurements schema - make it more flexible for custom fields
export const measurementsSchema = z.record(z.string(), z.any()).optional().default({});

// Contact info schema - make it more flexible
const contactInfoSchema = z.record(z.string(), z.any()).optional().default({});

export const noteSchema = z.object({
  text: z.string().min(1, "Note text is required"),
  addedBy: z.string().min(1, "Added by is required").optional(),
  addedAt: z.date().optional().default(new Date()),
});

// Create requisition schema - simplified
export const createRequisitionSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().max(500).optional().default(''),
  measurements: measurementsSchema,
  contactInfo: contactInfoSchema,
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'] as const).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT'] as const).optional(),
  dueDate: z.string().datetime().optional().nullable(),
  notes: z.array(z.any()).optional().default([]),
});

// Update requisition schema - simplified
export const updateRequisitionSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  description: z.string().max(500).optional().default(''),
  measurements: measurementsSchema.optional(),
  contactInfo: contactInfoSchema.optional(),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'] as const).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT'] as const).optional(),
  dueDate: z.string().datetime().optional().nullable(),
  notes: z.array(z.any()).optional(),
}).refine(
  (data) => Object.keys(data).length > 0,
  {
    message: "At least one field must be provided for update",
  }
);

// For the route validation (more strict)
export const requisitionSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().max(500).optional().default(''),
  measurements: z.record(z.string(), z.any()).optional().default({}),
  contactInfo: z.record(z.string(), z.any()).optional().default({}),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'] as const).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT'] as const).optional(),
  dueDate: z.string().datetime().optional().nullable(),
  notes: z.array(z.any()).optional().default([]),
});
// Types for TypeScript inference
export type RequisitionInput = z.infer<typeof requisitionSchema>;
export type CreateRequisitionInput = z.infer<typeof createRequisitionSchema>;
export type UpdateRequisitionInput = z.infer<typeof updateRequisitionSchema>;