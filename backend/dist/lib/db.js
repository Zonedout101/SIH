"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDatabase = initDatabase;
exports.getDb = getDb;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
let db = null;
async function initDatabase(dbPath) {
    const dir = path_1.default.dirname(dbPath);
    if (!fs_1.default.existsSync(dir)) {
        fs_1.default.mkdirSync(dir, { recursive: true });
    }
    db = await (0, sqlite_1.open)({ filename: dbPath, driver: sqlite3_1.default.Database });
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
    const row = await db.get('SELECT COUNT(*) as count FROM api_key');
    if ((row?.count ?? 0) === 0) {
        await db.run('INSERT INTO api_key(key, role) VALUES (?, ?), (?, ?), (?, ?)', 'admin-key', 'admin', 'collector-key', 'collector', 'lab-key', 'lab');
    }
}
function getDb() {
    if (!db)
        throw new Error('Database not initialized');
    return db;
}
