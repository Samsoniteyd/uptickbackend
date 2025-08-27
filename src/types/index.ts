import { Request } from 'express';

export interface IUser {
  id?: string;
  name: string;
  email: string;
  password: string;
  phone?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IRequisition {
  id?: string;
  userId: string;
  name: string;
  description?: string | null;
  measurements?: Measurement;
  contactInfo?: ContactInfo;
  status?: string;
  priority: string;
  dueDate?: Date;
  completedDate?: Date | null;
  notes?: Note[] | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Measurement {
  chest?: number;
  shoulders?: number;
  sleeveLengthLong?: number;
  sleeveLengthShort?: number;
  topLength?: number;
  neck?: number;
  tommy?: number;
  hip?: number;
  waist?: number;
  length?: number;
  lap?: number;
  base?: number;
  agbadaLength?: number;
  agbadaSleeve?: number;
  [key: string]: number | undefined;
}

export interface ContactInfo {
  phone?: string;
  email?: string;
}

export interface Note {
  text: string;
  addedBy: string;
  addedAt: Date;
}

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
  };
  query: {
    page?: string;
    limit?: string;
    status?: string;
    priority?: string;
    [key: string]: string | undefined;
  };
}

// Simplified constants - only what tailors need
export const RequisitionStatus = {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
} as const;

export const RequisitionPriority = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  URGENT: 'URGENT',
} as const;