const db = require('./db');

async function requireAdmin(req, res) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Token requerido' });
    return false;
  }
  const token = auth.slice(7);
  const valid = await db.verifyAdminSession(token);
  if (!valid) {
    res.status(401).json({ error: 'Token inválido o expirado' });
    return false;
  }
  return true;
}

module.exports = { requireAdmin };
