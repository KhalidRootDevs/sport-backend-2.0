import { Router } from 'express';
import { authenticate } from '../../middlewares/authenticate';
import {
  createSelectedLeague,
  deleteSelectedLeague,
  getAllSelectedLeagues,
  getSelectedLeagueById,
  updateSelectedLeague,
} from './controller';

const router = Router();

router.post('/create', authenticate, createSelectedLeague);
router.get('/all', authenticate, getAllSelectedLeagues);
router.get('/find/:id', authenticate, getSelectedLeagueById);
router.put('/update/:id', authenticate, updateSelectedLeague);
router.delete('/delete/:id', authenticate, deleteSelectedLeague);

export default router;
