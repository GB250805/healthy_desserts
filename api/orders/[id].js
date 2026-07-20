const db = require('../_lib/db');
const { requireAdmin } = require('../_lib/auth');

module.exports = async (req, res) => {
  await db.ensureSchema();

  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'ID requerido' });

  if (req.method === 'PATCH') {
    const authorized = await requireAdmin(req, res);
    if (!authorized) return;

    const buffers = [];
    for await (const chunk of req) buffers.push(chunk);
    let body;
    try {
      body = JSON.parse(Buffer.concat(buffers).toString() || '{}');
    } catch {
      return res.status(400).json({ error: 'JSON inválido' });
    }

    const { status } = body;
    const validStatuses = ['new', 'cooking', 'ready', 'done'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: `Estado inválido. Debe ser: ${validStatuses.join(', ')}` });
    }

    try {
      const existing = await db.getOrderById(id);
      if (!existing) return res.status(404).json({ error: 'Pedido no encontrado' });

      const updated = await db.updateOrderStatus(id, status);
      res.json({ order: updated });
    } catch (err) {
      console.error('Error update order:', err);
      res.status(500).json({ error: 'Error al actualizar el pedido' });
    }
    return;
  }

  if (req.method === 'DELETE') {
    const authorized = await requireAdmin(req, res);
    if (!authorized) return;

    try {
      const existing = await db.getOrderById(id);
      if (!existing) return res.status(404).json({ error: 'Pedido no encontrado' });

      await db.deleteOrder(id);
      res.json({ ok: true });
    } catch (err) {
      console.error('Error delete order:', err);
      res.status(500).json({ error: 'Error al eliminar el pedido' });
    }
    return;
  }

  res.status(405).json({ error: 'Método no permitido' });
};
