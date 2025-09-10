import crypto from 'crypto';
import { getDb } from './db';

export async function appendToLedger(eventId: string) {
  const db = getDb();
  const prev = await db.get<{ hash: string }>('SELECT hash FROM ledger_block ORDER BY index_no DESC LIMIT 1');
  const prevHash = prev?.hash ?? 'GENESIS';
  const createdAt = new Date().toISOString();
  const hash = crypto.createHash('sha256').update(`${prevHash}:${eventId}:${createdAt}`).digest('hex');
  await db.run('INSERT INTO ledger_block(hash, prev_hash, event_id, created_at) VALUES (?, ?, ?, ?)', hash, prevHash, eventId, createdAt);
  return { hash, prevHash, createdAt };
}

export async function verifyLedger() {
  const db = getDb();
  const rows = await db.all<Array<{ index_no: number, hash: string, prev_hash: string, event_id: string, created_at: string }>>('SELECT * FROM ledger_block ORDER BY index_no ASC');
  let prevHash = 'GENESIS';
  for (const row of rows) {
    const recomputed = crypto.createHash('sha256').update(`${prevHash}:${row.event_id}:${row.created_at}`).digest('hex');
    if (recomputed !== row.hash) return false;
    prevHash = row.hash;
  }
  return true;
}

