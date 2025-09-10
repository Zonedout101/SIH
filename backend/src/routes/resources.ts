import { Router } from 'express';
import { nanoid } from 'nanoid';
import { getDb } from '../lib/db';
import { appendToLedger } from '../lib/ledger';
import { requireApiKey } from '../middleware/auth';
import { CollectionEventSchema, ProcessingStepSchema, QualityTestSchema } from '../models/schemas';

export const router = Router();

router.post('/collection-events', requireApiKey(['admin', 'collector']), async (req, res) => {
  const parse = CollectionEventSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: parse.error.flatten() });
  const event = { ...parse.data, id: parse.data.id ?? nanoid() };
  const db = getDb();
  const createdAt = new Date().toISOString();
  await db.run('INSERT INTO event(id, type, payload, created_at) VALUES (?, ?, ?, ?)', event.id, 'CollectionEvent', JSON.stringify(event), createdAt);
  await appendToLedger(event.id);
  res.status(201).json(event);
});

router.post('/processing-steps', requireApiKey(['admin']), async (req, res) => {
  const parse = ProcessingStepSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: parse.error.flatten() });
  const event = { ...parse.data, id: parse.data.id ?? nanoid() };
  const db = getDb();
  const createdAt = new Date().toISOString();
  await db.run('INSERT INTO event(id, type, payload, created_at) VALUES (?, ?, ?, ?)', event.id, 'ProcessingStep', JSON.stringify(event), createdAt);
  await appendToLedger(event.id);
  res.status(201).json(event);
});

router.post('/quality-tests', requireApiKey(['admin', 'lab']), async (req, res) => {
  const parse = QualityTestSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: parse.error.flatten() });
  const event = { ...parse.data, id: parse.data.id ?? nanoid() };
  const db = getDb();
  const createdAt = new Date().toISOString();
  await db.run('INSERT INTO event(id, type, payload, created_at) VALUES (?, ?, ?, ?)', event.id, 'QualityTest', JSON.stringify(event), createdAt);
  await appendToLedger(event.id);
  res.status(201).json(event);
});

router.get('/events', requireApiKey(['admin']), async (_req, res) => {
  const db = getDb();
  const rows = await db.all('SELECT * FROM event ORDER BY created_at DESC');
  res.json(rows.map((r: any) => ({ ...r, payload: JSON.parse(r.payload) })));
});

