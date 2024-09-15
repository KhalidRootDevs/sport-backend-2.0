import { Router } from 'express';
import { getFixturesRapid } from './controller';

const router = Router();

router.post('/fixtures/formated', getFixturesRapid);

export default router;
