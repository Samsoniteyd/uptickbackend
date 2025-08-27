// import { z } from 'zod';
// import { RequisitionStatus, RequisitionPriority } from '../types';


// //
// // ✅ Flexible Measurements Schema (any JSON key: number)
// //
// export const measurementSchema = z.record(
//   z.string(),
//   z.union([z.string(), z.number(), z.boolean()])
// ).optional();
// //
// // ✅ Flexible Contact Info Schema (any JSON key: string)
// //
// export const contactInfoSchema = z.record(
//   z.string(),
//   z.union([z.string(), z.number(), z.boolean()])
// ).optional();

// export const noteSchema = z.object({
//   text: z.string().min(1, "Note text is required"),
//   addedBy: z.string().min(1, "Added by is required"),
// });

// //
// // ✅ Requisition Schema now accepts flexible JSON for measurements + contactInfo
// //
// export const requisitionSchema = z.object({
//   name: z.string().min(2).max(100),
//   description: z.string().max(500).optional(),
//   measurements: measurementSchema,
//   contactInfo: contactInfoSchema,
//   status: z.preprocess(
//     (val) => (typeof val === "string" ? val.toUpperCase() : val),
//     z.nativeEnum(RequisitionStatus)
//   ),
//   priority: z.preprocess(
//     (val) => (typeof val === "string" ? val.toUpperCase() : val),
//     z.nativeEnum(RequisitionPriority)
//   ),
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

// export const updateRequisitionSchema = requisitionSchema.partial();




// export type RequisitionInput = z.infer<typeof requisitionSchema>;
// export type UpdateRequisitionInput = z.infer<typeof updateRequisitionSchema>;

