import { Request, Response, NextFunction } from 'express';
import { getDb } from '../lib/db';

export function requireApiKey(allowedRoles: Array<string>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const key = req.header('x-api-key');
    if (!key) return res.status(401).json({ error: 'Missing API key' });
    const db = getDb();
    const row = await db.get<{ key: string, role: string }>('SELECT key, role FROM api_key WHERE key = ?', key);
    if (!row || !allowedRoles.includes(row.role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    (req as any).role = row.role;
    next();
  };
}

