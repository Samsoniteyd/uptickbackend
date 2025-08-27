import { Response } from 'express';
import prisma from '../config/database';

import { AuthRequest } from '../types';
import { UpdateUserInput } from '../validations/authValidation';

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user?.userId
      },
      select: {
        id: true,
        email: true,
        name: true,
        // include other fields you want, exclude password
      }
    });

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
      return;
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error fetching profile',
      error: error.message,
    });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const updateData: UpdateUserInput = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'User not authenticated',
      });
      return;
    }

    // Update the user and exclude password from the response
    const user = await prisma.user.update({
      where: {
        id: userId
      },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        // include all other fields you want to return, exclude password
        createdAt: true,
        updatedAt: true,
        // add other fields from your User model
      }
    });

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: user,
    });
  } catch (error: any) {
    if (error.code === 'P2025') {
      // Prisma record not found error
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
      return;
    }
    
    res.status(500).json({
      success: false,
      message: 'Error updating profile',
      error: error.message,
    });
  }
};