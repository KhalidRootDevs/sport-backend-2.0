import { Router } from 'express';
import {
  createNotification,
  getAllNotifications,
  getNotificationById,
  deleteNotification,
} from './controller';
import { authenticate } from '../../middlewares/authenticate';

const router = Router();

router.post('/notifications', authenticate, createNotification);
router.get('/notifications', authenticate, getAllNotifications);
router.get('/notifications/:id', authenticate, getNotificationById);
router.delete('/notifications/:id', authenticate, deleteNotification);

export default router;
