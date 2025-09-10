"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appendToLedger = appendToLedger;
exports.verifyLedger = verifyLedger;
const crypto_1 = __importDefault(require("crypto"));
const db_1 = require("./db");
async function appendToLedger(eventId) {
    const db = (0, db_1.getDb)();
    const prev = await db.get('SELECT hash FROM ledger_block ORDER BY index_no DESC LIMIT 1');
    const prevHash = prev?.hash ?? 'GENESIS';
    const createdAt = new Date().toISOString();
    const hash = crypto_1.default.createHash('sha256').update(`${prevHash}:${eventId}:${createdAt}`).digest('hex');
    await db.run('INSERT INTO ledger_block(hash, prev_hash, event_id, created_at) VALUES (?, ?, ?, ?)', hash, prevHash, eventId, createdAt);
    return { hash, prevHash, createdAt };
}
async function verifyLedger() {
    const db = (0, db_1.getDb)();
    const rows = await db.all('SELECT * FROM ledger_block ORDER BY index_no ASC');
    let prevHash = 'GENESIS';
    for (const row of rows) {
        const recomputed = crypto_1.default.createHash('sha256').update(`${prevHash}:${row.event_id}:${row.created_at}`).digest('hex');
        if (recomputed !== row.hash)
            return false;
        prevHash = row.hash;
    }
    return true;
}
