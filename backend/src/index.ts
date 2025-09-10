import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { join } from 'path';
import { initDatabase } from './lib/db';
import { router as apiRouter } from './routes';
import { router as docsRouter } from './routes/docs';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api', apiRouter);
app.use('/docs', docsRouter);

async function start() {
  await initDatabase(join(process.cwd(), 'data', 'app.db'));
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
    console.log(`API docs at http://localhost:${PORT}/docs`);
  });
}

start().catch((err) => {
  console.error('Fatal startup error', err);
  process.exit(1);
});

