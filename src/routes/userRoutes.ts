import express from 'express';
import * as userController from '../controllers/api';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/user/:id', authMiddleware, userController.getUser);
router.put('/user/:id', authMiddleware, userController.updateUser);

export default router;
