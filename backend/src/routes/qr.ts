import { Router } from 'express';
import { nanoid } from 'nanoid';
import QRCode from 'qrcode';
import { getDb } from '../lib/db';
import { requireApiKey } from '../middleware/auth';

export const router = Router();

router.post('/batches', requireApiKey(['admin']), async (req, res) => {
  const id = (req.body?.id as string) || nanoid();
  const db = getDb();
  await db.run('INSERT OR IGNORE INTO batch(id) VALUES (?)', id);
  res.status(201).json({ id });
});

router.get('/batches/:id/qr', async (req, res) => {
  const { id } = req.params;
  const db = getDb();
  const url = `${req.protocol}://${req.get('host')}/api/v1/provenance/${id}`;
  const dataUrl = await QRCode.toDataURL(url);
  await db.run('UPDATE batch SET qr = ? WHERE id = ?', dataUrl, id);
  res.json({ id, qr: dataUrl, url });
});

router.get('/provenance/:batchId', async (req, res) => {
  const db = getDb();
  const { batchId } = req.params;
  const events = await db.all('SELECT * FROM event ORDER BY created_at ASC');
  const payloads = events.map((e: any) => JSON.parse(e.payload)).filter((p: any) => p.batchId === batchId || p.id === batchId);
  res.json({ batchId, events: payloads });
});

