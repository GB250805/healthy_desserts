const { v4: uuidv4 } = require('uuid');
const db = require('../_lib/db');

const adminLocks = new Map();

module.exports = async (req, res) => {
  await db.ensureSchema();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';

  const lock = adminLocks.get(ip);
  if (lock && lock.lockUntil > Date.now()) {
    const remaining = Math.ceil((lock.lockUntil - Date.now()) / 1000);
    return res.status(429).json({ error: `Demasiados intentos. Intenta en ${remaining}s.`, remaining, locked: true });
  }

  const buffers = [];
  for await (const chunk of req) buffers.push(chunk);
  const { password } = JSON.parse(Buffer.concat(buffers).toString() || '{}');

  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!password || password.trim() !== adminPassword) {
    const current = adminLocks.get(ip) || { attempts: 0, lockUntil: 0 };
    current.attempts += 1;
    if (current.attempts >= 5) {
      current.attempts = 0;
      current.lockUntil = Date.now() + 60 * 1000;
    }
    adminLocks.set(ip, current);

    if (current.lockUntil > Date.now()) {
      return res.status(429).json({ error: 'Demasiados intentos fallidos. Bloqueado 60s.', remaining: 60, locked: true });
    }

    const remainingAttempts = 5 - current.attempts;
    return res.status(401).json({ error: `Contraseña incorrecta. Intentos restantes: ${remainingAttempts}`, remaining: remainingAttempts });
  }

  adminLocks.delete(ip);

  const token = uuidv4();
  try {
    await db.createAdminSession(token);
    res.json({ token });
  } catch (err) {
    console.error('Error login:', err);
    res.status(500).json({ error: 'Error del servidor' });
  }
};
