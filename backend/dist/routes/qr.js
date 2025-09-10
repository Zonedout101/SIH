"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const nanoid_1 = require("nanoid");
const qrcode_1 = __importDefault(require("qrcode"));
const db_1 = require("../lib/db");
const auth_1 = require("../middleware/auth");
exports.router = (0, express_1.Router)();
exports.router.post('/batches', (0, auth_1.requireApiKey)(['admin']), async (req, res) => {
    const id = req.body?.id || (0, nanoid_1.nanoid)();
    const db = (0, db_1.getDb)();
    await db.run('INSERT OR IGNORE INTO batch(id) VALUES (?)', id);
    res.status(201).json({ id });
});
exports.router.get('/batches/:id/qr', async (req, res) => {
    const { id } = req.params;
    const db = (0, db_1.getDb)();
    const url = `${req.protocol}://${req.get('host')}/api/v1/provenance/${id}`;
    const dataUrl = await qrcode_1.default.toDataURL(url);
    await db.run('UPDATE batch SET qr = ? WHERE id = ?', dataUrl, id);
    res.json({ id, qr: dataUrl, url });
});
exports.router.get('/provenance/:batchId', async (req, res) => {
    const db = (0, db_1.getDb)();
    const { batchId } = req.params;
    const events = await db.all('SELECT * FROM event ORDER BY created_at ASC');
    const payloads = events.map((e) => JSON.parse(e.payload)).filter((p) => p.batchId === batchId || p.id === batchId);
    res.json({ batchId, events: payloads });
});
