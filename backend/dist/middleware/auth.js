"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireApiKey = requireApiKey;
const db_1 = require("../lib/db");
function requireApiKey(allowedRoles) {
    return async (req, res, next) => {
        const key = req.header('x-api-key');
        if (!key)
            return res.status(401).json({ error: 'Missing API key' });
        const db = (0, db_1.getDb)();
        const row = await db.get('SELECT key, role FROM api_key WHERE key = ?', key);
        if (!row || !allowedRoles.includes(row.role)) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        req.role = row.role;
        next();
    };
}
