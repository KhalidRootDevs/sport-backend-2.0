import { Router } from 'express';
import { authenticate } from '../../middlewares/authenticate';
import {
  createHighlight,
  deleteHighlight,
  getAllHighlights,
  getHighlightById,
  updateHighlight,
} from './controller';

const router = Router();

// Create a new highlight
router.post('/create', authenticate, createHighlight);

// Get all highlights
router.get('/all', authenticate, getAllHighlights);

// Get a single highlight by ID
router.get('/find/:id', authenticate, getHighlightById);

// Update a highlight by ID
router.put('/update/:id', authenticate, updateHighlight);

// Delete a highlight by ID
router.delete('/delete/:id', authenticate, deleteHighlight);

export default router;
