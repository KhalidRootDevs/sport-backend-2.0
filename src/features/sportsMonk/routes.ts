import { Router } from 'express';
import { authenticate } from '../../middlewares/authenticate';
import { getFixtureMonks } from './controller';
import { redisCache } from '../../services/redis';

const router = Router();

// Get formatted fixture
router.post('/fixtures/formatted', redisCache.cachingMiddleware(), getFixtureMonks);

export default router;
