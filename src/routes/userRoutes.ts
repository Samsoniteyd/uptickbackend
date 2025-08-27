import express from 'express';
import { getProfile, updateProfile } from '../controllers/userController';
import { validate } from '../middleware/validation';
import { updateUserSchema } from '../validations/authValidation';
import { authenticate } from '../middleware/middleware';

const router = express.Router();

router.use(authenticate);

router.get('/', getProfile);
router.put('/', validate(updateUserSchema), updateProfile);

export default router;