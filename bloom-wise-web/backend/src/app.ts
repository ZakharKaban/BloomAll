import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import router from './routes';

dotenv.config();

export function createServer() {
  const app = express();
  app.use(helmet());
  app.use(cors());
  app.use(express.json());

  app.use('/api', router);

  app.get('/health', (_req, res) => res.json({ ok: true }));

  return app;
}

export default createServer();
