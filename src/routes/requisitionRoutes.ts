import express from 'express';
import {
  createRequisition,
  getRequisitions,
  getRequisition,
  updateRequisition,
  deleteRequisition,
  addNoteToRequisition,
} from '../controllers/requisitionController';
import { validate } from '../middleware/validation';
import { requisitionSchema, updateRequisitionSchema } from '../validations/requisitionValidation';
import { authenticate } from '../middleware/middleware';

const router = express.Router();

router.use(authenticate);

router.post('/', validate(requisitionSchema), createRequisition);
router.get('/', getRequisitions);
router.get('/:id', getRequisition);
router.put('/:id', validate(updateRequisitionSchema), updateRequisition);
router.delete('/:id', deleteRequisition);
router.post('/:id/notes', addNoteToRequisition);

export default router;