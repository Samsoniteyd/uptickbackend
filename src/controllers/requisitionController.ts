import { Response } from 'express';
import prisma from '../config/database';
import { AuthRequest } from '../types';
import { requisitionSchema, updateRequisitionSchema } from '../validations/requisitionValidation';
import { Prisma, Status, Priority } from '@prisma/client'; 
import { ZodError } from "zod";




// export const createRequisition = async (req: AuthRequest, res: Response): Promise<void> => {
//   try {
//     const userId = req.user?.userId;

//     if (!userId) {
//       res.status(401).json({
//         success: false,
//         message: 'User not authenticated',
//       });
//       return;
//     }

//     // ✅ safer parse: shows validation errors
//     const requisitionData = requisitionSchema.parse(req.body);

//     const requisition = await prisma.requisition.create({
//       data: {
//         name: requisitionData.name,
//         description: requisitionData.description || undefined,
//         measurements: requisitionData.measurements,
//         contactInfo: requisitionData.contactInfo,
//         status: requisitionData.status,
//         priority: requisitionData.priority,
//         dueDate: requisitionData.dueDate || null,
//         notes: requisitionData.notes || undefined,
//         userId,
//       },
//       include: {
//         user: { select: { name: true, email: true } },
//       },
//     });

//     res.status(201).json({
//       success: true,
//       message: 'Requisition created successfully',
//       data: requisition,
//     });
//   } catch (error: any) {
//     if (error.name === "ZodError") {
//       res.status(400).json({
//         success: false,
//         message: "Validation failed",
//         errors: error.errors,   // 👈 return the exact validation issues
//       });
//       return;
//     }

//     res.status(500).json({
//       success: false,
//       message: 'Error creating requisition',
//       error: error.message,
//     });
//   }
// };


export const createRequisition = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated',
      });
      return;
    }

    // Use safeParse to get detailed errors
    const validationResult = requisitionSchema.safeParse(req.body);
    
    if (!validationResult.success) {
      console.log('Validation errors:', validationResult.error.issues); // Use issues here
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationResult.error.issues.map((issue) => ({ // Use issues here
          field: issue.path.join("."),
          message: issue.message,
          code: issue.code,
        })),
      });
      return;
    }

    const requisitionData = validationResult.data;

    // Convert string dates to Date objects
    const dueDate = requisitionData.dueDate ? new Date(requisitionData.dueDate) : null;

    const requisition = await prisma.requisition.create({
      data: {
        name: requisitionData.name,
        description: requisitionData.description,
        measurements: requisitionData.measurements,
        contactInfo: requisitionData.contactInfo,
        status: requisitionData.status as Status,
        priority: requisitionData.priority as Priority,
        dueDate: dueDate,
        notes: requisitionData.notes,
        userId,
      },
      include: {
        user: { select: { name: true, email: true } },
      },
    });

    res.status(201).json({
      success: true,
      message: 'Requisition created successfully',
      data: requisition,
    });
  } catch (error: any) {
    console.error('Create requisition error:', error);
    
    // Handle ZodError in catch block too
    if (error instanceof ZodError) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.issues.map((issue) => ({ // Use issues here
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: 'Error creating requisition',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};



export const getRequisitions = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const where: Prisma.RequisitionWhereInput = {};

    if (req.query.status && Object.values(Status).includes(req.query.status as Status)) {
      where.status = req.query.status as Status;
    }

    if (req.query.priority && Object.values(Priority).includes(req.query.priority as Priority)) {
      where.priority = req.query.priority as Priority;
    }

    const [requisitions, total] = await Promise.all([
      prisma.requisition.findMany({
        where,
        include: {
          user: {
            select: { name: true, email: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.requisition.count({ where }),
    ]);

    res.json({
      success: true,
      data: requisitions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching requisitions',
        error: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Unknown error occurred',
      });
    }
  }
};



export const getRequisition = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const requisition = await prisma.requisition.findFirst({
      where: { id },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    if (!requisition) {
      res.status(404).json({
        success: false,
        message: 'Requisition not found',
      });
      return;
    }

    res.json({
      success: true,
      data: requisition,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error fetching requisition',
      error: error.message,
    });
  }
};

export const updateRequisition = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    // Use safeParse to get detailed errors
    const validationResult = updateRequisitionSchema.safeParse(req.body);
    
    if (!validationResult.success) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationResult.error.issues.map((issue) => ({ // Use issues here
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
      return;
    }

    const updateData = validationResult.data;

    // Map priority and status to Prisma enums if present
    const prismaUpdateData = {
      ...updateData,
      priority: updateData.priority ? (updateData.priority as string).toUpperCase() as Priority : undefined,
      status: updateData.status ? (updateData.status as string).toUpperCase() as Status : undefined,
    };

    const requisition = await prisma.requisition.update({
      where: { id },
      data: prismaUpdateData,
      include: {
        user: { select: { name: true, email: true } }
      }
    });

    res.json({
      success: true,
      message: "Requisition updated successfully",
      data: requisition,
    });
  } catch (error: any) {
    if (error instanceof ZodError) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.issues.map((issue) => ({ // Use issues here
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
      return;
    }

    if (error.code === "P2025") {
      res.status(404).json({
        success: false,
        message: "Requisition not found",
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Error updating requisition",
      error: error.message,
    });
  }
};


// export const updateRequisition = async (req: AuthRequest, res: Response): Promise<void> => {
//   try {
// const { id } = req.params as { id: string };

//     // ✅ Explicitly safe-parse so we always get error details
//     const parsed = updateRequisitionSchema.safeParse(req.body);

//     if (!parsed.success) {
//       res.status(400).json({
//         success: false,
//         message: "Validation failed",
//         errors: parsed.error.issues.map((issue) => ({
//           field: issue.path.join("."),
//           message: issue.message,
//         })),
//       });
//       return;
//     }

//     const requisition = await prisma.requisition.update({
//       where: { id },
//       data: parsed.data,
//       include: {
//         user: { select: { name: true, email: true } },
//       },
//     });

//     res.json({
//       success: true,
//       message: "Requisition updated successfully",
//       data: requisition,
//     });
//   } catch (error: any) {
//     if (error.code === "P2025") {
//       res.status(404).json({
//         success: false,
//         message: "Requisition not found",
//       });
//       return;
//     }

//     res.status(500).json({
//       success: false,
//       message: "Error updating requisition",
//       error: error.message,
//     });
//   }
// };

export const deleteRequisition = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const requisition = await prisma.requisition.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: 'Requisition deleted successfully',
    });
  } catch (error: any) {
    if (error.code === 'P2025') {
      res.status(404).json({
        success: false,
        message: 'Requisition not found',
      });
      return;
    }
    
    res.status(500).json({
      success: false,
      message: 'Error deleting requisition',
      error: error.message,
    });
  }
};

export const addNoteToRequisition = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const userId = req.user?.userId;

    const requisition = await prisma.requisition.findFirst({
      where: { id },
    });

    if (!requisition) {
      res.status(404).json({
        success: false,
        message: 'Requisition not found',
      });
      return;
    }

    const currentNotes = requisition.notes as any[] || [];
    const newNote = {
      text,
      addedBy: userId!,
      addedAt: new Date(),
    };

    const updatedRequisition = await prisma.requisition.update({
      where: { id },
      data: {
        notes: [...currentNotes, newNote],
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    res.json({
      success: true,
      message: 'Note added successfully',
      data: updatedRequisition,
    });
  } catch (error: any) {
    if (error.code === 'P2025') {
      res.status(404).json({
        success: false,
        message: 'Requisition not found',
      });
      return;
    }
    
    res.status(500).json({
      success: false,
      message: 'Error adding note to requisition',
      error: error.message,
    });
  }
};