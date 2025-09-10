import { Router } from 'express';
import { router as eventsRouter } from './resources';
import { router as batchesRouter } from './qr';

export const router = Router();

router.use('/v1', eventsRouter);
router.use('/v1', batchesRouter);

