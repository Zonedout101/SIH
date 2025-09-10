"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const nanoid_1 = require("nanoid");
const db_1 = require("../lib/db");
const ledger_1 = require("../lib/ledger");
const auth_1 = require("../middleware/auth");
const schemas_1 = require("../models/schemas");
exports.router = (0, express_1.Router)();
exports.router.post('/collection-events', (0, auth_1.requireApiKey)(['admin', 'collector']), async (req, res) => {
    const parse = schemas_1.CollectionEventSchema.safeParse(req.body);
    if (!parse.success)
        return res.status(400).json({ error: parse.error.flatten() });
    const event = { ...parse.data, id: parse.data.id ?? (0, nanoid_1.nanoid)() };
    const db = (0, db_1.getDb)();
    const createdAt = new Date().toISOString();
    await db.run('INSERT INTO event(id, type, payload, created_at) VALUES (?, ?, ?, ?)', event.id, 'CollectionEvent', JSON.stringify(event), createdAt);
    await (0, ledger_1.appendToLedger)(event.id);
    res.status(201).json(event);
});
exports.router.post('/processing-steps', (0, auth_1.requireApiKey)(['admin']), async (req, res) => {
    const parse = schemas_1.ProcessingStepSchema.safeParse(req.body);
    if (!parse.success)
        return res.status(400).json({ error: parse.error.flatten() });
    const event = { ...parse.data, id: parse.data.id ?? (0, nanoid_1.nanoid)() };
    const db = (0, db_1.getDb)();
    const createdAt = new Date().toISOString();
    await db.run('INSERT INTO event(id, type, payload, created_at) VALUES (?, ?, ?, ?)', event.id, 'ProcessingStep', JSON.stringify(event), createdAt);
    await (0, ledger_1.appendToLedger)(event.id);
    res.status(201).json(event);
});
exports.router.post('/quality-tests', (0, auth_1.requireApiKey)(['admin', 'lab']), async (req, res) => {
    const parse = schemas_1.QualityTestSchema.safeParse(req.body);
    if (!parse.success)
        return res.status(400).json({ error: parse.error.flatten() });
    const event = { ...parse.data, id: parse.data.id ?? (0, nanoid_1.nanoid)() };
    const db = (0, db_1.getDb)();
    const createdAt = new Date().toISOString();
    await db.run('INSERT INTO event(id, type, payload, created_at) VALUES (?, ?, ?, ?)', event.id, 'QualityTest', JSON.stringify(event), createdAt);
    await (0, ledger_1.appendToLedger)(event.id);
    res.status(201).json(event);
});
exports.router.get('/events', (0, auth_1.requireApiKey)(['admin']), async (_req, res) => {
    const db = (0, db_1.getDb)();
    const rows = await db.all('SELECT * FROM event ORDER BY created_at DESC');
    res.json(rows.map((r) => ({ ...r, payload: JSON.parse(r.payload) })));
});
