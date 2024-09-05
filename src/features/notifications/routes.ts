import { Router } from 'express';
import {
  createNotification,
  getAllNotifications,
  getNotificationById,
  deleteNotification,
} from './controller';
import { authenticate } from '../../middlewares/authenticate';

const router = Router();

router.post('/create', createNotification);
router.get('/all', authenticate, getAllNotifications);
router.get('/find/:id', authenticate, getNotificationById);
router.delete('/delete/:id', authenticate, deleteNotification);

export default router;
