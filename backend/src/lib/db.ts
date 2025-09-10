import fs from 'fs';
import path from 'path';
import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

let db: Database<sqlite3.Database, sqlite3.Statement> | null = null;

export async function initDatabase(dbPath: string) {
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  db = await open({ filename: dbPath, driver: sqlite3.Database });

  await db.exec(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS event (
      id TEXT PRIMARY KEY,
      type TEXT NOT NULL,
      payload TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS ledger_block (
      index_no INTEGER PRIMARY KEY AUTOINCREMENT,
      hash TEXT NOT NULL,
      prev_hash TEXT,
      event_id TEXT NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY(event_id) REFERENCES event(id)
    );
    CREATE TABLE IF NOT EXISTS api_key (
      key TEXT PRIMARY KEY,
      role TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS batch (
      id TEXT PRIMARY KEY,
      qr TEXT
    );
  `);

  // Seed API keys if empty
  const row = await db.get<{ count: number }>('SELECT COUNT(*) as count FROM api_key');
  if ((row?.count ?? 0) === 0) {
    await db.run('INSERT INTO api_key(key, role) VALUES (?, ?), (?, ?), (?, ?)',
      'admin-key', 'admin',
      'collector-key', 'collector',
      'lab-key', 'lab');
  }
}

export function getDb() {
  if (!db) throw new Error('Database not initialized');
  return db;
}

