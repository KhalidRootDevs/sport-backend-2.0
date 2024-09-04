import { Router } from 'express';
import { authenticate } from '../../middlewares/authenticate';
import { createNews, deleteNews, getAllNews, getNewsById } from './controller';

const router = Router();

router.post('/create', authenticate, createNews);
router.get('/all', authenticate, getAllNews);
router.get('/find/:id', authenticate, getNewsById);
router.delete('/delete/:id', authenticate, deleteNews);

export default router;
