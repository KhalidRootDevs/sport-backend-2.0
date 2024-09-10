import { Router } from 'express';
import { authenticate } from '../../middlewares/authenticate';
import {
  allSelectedLeagues,
  createSelectedLeague,
  deleteSelectedLeague,
  getAllSelectedLeagues,
  getSelectedLeagueById,
  sortByPosition,
  updateSelectedLeague,
} from './controller';

const router = Router();

router.get('/every', allSelectedLeagues);
router.patch("/sortBy", authenticate, sortByPosition);
router.get('/all', getAllSelectedLeagues);
router.post('/create', authenticate, createSelectedLeague);
router.get('/find/:id', authenticate, getSelectedLeagueById);
router.put('/update/:id', authenticate, updateSelectedLeague);
router.delete('/delete/:id', authenticate, deleteSelectedLeague);

export default router;
