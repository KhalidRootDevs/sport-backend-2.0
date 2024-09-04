import cookieParser from 'cookie-parser';
import express, { Application, Request, Response } from 'express';
import cors from './config/cors';
import router from './router';
import { redisCache } from './services/redis';
import { monksFootballV3Data } from './services/sportsApi/sportMonkV3';
import { errorMiddleware, loggerMiddleware, notFoundMiddleware } from './utils/logger';

const app: Application = express();

// Middleware
app.use(loggerMiddleware);
app.use(express.json());
app.use(cookieParser());
app.use(cors);

// Root Route
app.get('/', (req: Request, res: Response) => {
  const welcomeMessage = {
    message: 'Welcome to our Football Platform!',
    description: 'Connecting you with the best football insights, live scores, and updates.',
    serverTime: new Date().toISOString(),
    funFact:
      'Did you know? The fastest goal in football history was scored just 2.4 seconds after kickoff!',
  };

  res.json(welcomeMessage);
});

// API Routes
app.use('/api', router);
// Sports routes
app.get('/football/v3/*', redisCache.cachingMiddleware(), monksFootballV3Data);
// 404 Routes
app.use(notFoundMiddleware);
// Error middleware
app.use(errorMiddleware);

export default app;
