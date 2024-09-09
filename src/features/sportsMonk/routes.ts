import { Router } from 'express';
import { authenticate } from '../../middlewares/authenticate';
import { getFixtureMonks, searchLeagues } from './controller';

const router = Router();

// Get formatted fixture
router.get('/fixtures/formatted', getFixtureMonks);

router.get('/leagues/search', searchLeagues);

export default router;
