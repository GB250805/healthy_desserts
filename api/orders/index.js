const db = require('../_lib/db');
const { requireAdmin } = require('../_lib/auth');

module.exports = async (req, res) => {
  await db.ensureSchema();

  if (req.method === 'GET') {
    const authorized = await requireAdmin(req, res);
    if (!authorized) return;

    try {
      const orders = await db.getAllOrders();
      res.json({ orders });
    } catch (err) {
      console.error('Error get orders:', err);
      res.status(500).json({ error: 'Error al obtener pedidos' });
    }
    return;
  }

  if (req.method === 'POST') {
    const buffers = [];
    for await (const chunk of req) buffers.push(chunk);
    let body;
    try {
      body = JSON.parse(Buffer.concat(buffers).toString() || '{}');
    } catch {
      return res.status(400).json({ error: 'JSON inválido' });
    }

    const { buyer, classroom, items, total } = body;

    if (!buyer?.nombres || !buyer?.apellidos || !buyer?.id || !buyer?.celular) {
      return res.status(400).json({ error: 'Datos del comprador incompletos' });
    }
    if (!classroom) {
      return res.status(400).json({ error: 'Aula requerida' });
    }
    if (!items?.length) {
      return res.status(400).json({ error: 'El pedido debe tener al menos un item' });
    }
    if (typeof total !== 'number' || total <= 0) {
      return res.status(400).json({ error: 'Total inválido' });
    }

    const id = `HD-${Date.now().toString(36).toUpperCase()}`;
    const createdAt = new Date().toISOString();

    try {
      const order = await db.createOrder({ id, buyer, classroom, items, total, createdAt });
      res.status(201).json({ order });
    } catch (err) {
      console.error('Error create order:', err);
      res.status(500).json({ error: 'Error al crear el pedido' });
    }
    return;
  }

  if (req.method === 'DELETE') {
    const authorized = await requireAdmin(req, res);
    if (!authorized) return;

    try {
      await db.deleteAllOrders();
      res.json({ ok: true });
    } catch (err) {
      console.error('Error delete all:', err);
      res.status(500).json({ error: 'Error al eliminar pedidos' });
    }
    return;
  }

  res.status(405).json({ error: 'Método no permitido' });
};
