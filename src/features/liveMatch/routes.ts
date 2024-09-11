import { Router } from 'express';
import { authenticate, authorizeRoles } from '../../middlewares/authenticate';
import { UserRole } from '../user/model';
import {
  createLiveMatch,
  deleteLiveMatch,
  getLiveMatch,
  getLiveMatches,
  sortLiveMatches,
  updateLiveMatch,
  updateMatchOrder,
} from './controller';

const router = Router();

// Route to get all live matches
router.get('/all', authenticate, getLiveMatches);

// Route to get a live match by ID
router.get('/find/:id', authenticate, getLiveMatch);

// Route to create a new live match
router.post(
  '/create',
  authenticate,
  authorizeRoles([UserRole.ADMIN, UserRole.MODERATOR]),
  createLiveMatch
);

// Route to update an existing live match
router.put(
  '/update/:id',
  authenticate,
  authorizeRoles([UserRole.ADMIN, UserRole.MODERATOR]),
  updateLiveMatch
);

router.patch("/sort", authenticate, authorizeRoles(([UserRole.ADMIN, UserRole.MODERATOR])), sortLiveMatches);

// Route to delete a live match
router.delete('/delete/:id', authenticate, deleteLiveMatch);

router.put('/sort/order', authenticate, updateMatchOrder);

export default router;
