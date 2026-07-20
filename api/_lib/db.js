const { neon } = require('@neondatabase/serverless');

let schemaReady = false;

async function ensureSchema() {
  if (schemaReady) return;
  await initSchema();
  schemaReady = true;
}

function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL no configurada');
  return neon(url);
}

function parseRow(row) {
  if (!row) return null;
  return {
    ...row,
    items: typeof row.items === 'string' ? JSON.parse(row.items) : row.items,
    buyer: {
      nombres: row.buyer_nombres,
      apellidos: row.buyer_apellidos,
      id: row.buyer_id,
      celular: row.buyer_celular,
    },
  };
}

async function getAllOrders() {
  const sql = getSql();
  const rows = await sql`SELECT * FROM orders ORDER BY created_at DESC`;
  return rows.map(parseRow);
}

async function getOrderById(id) {
  const sql = getSql();
  const rows = await sql`SELECT * FROM orders WHERE id = ${id}`;
  return rows.length ? parseRow(rows[0]) : null;
}

async function createOrder({ id, buyer, classroom, items, total, createdAt }) {
  const sql = getSql();
  await sql`
    INSERT INTO orders (id, buyer_nombres, buyer_apellidos, buyer_id, buyer_celular, classroom, items, total, created_at)
    VALUES (${id}, ${buyer.nombres}, ${buyer.apellidos}, ${buyer.id}, ${buyer.celular}, ${classroom}, ${JSON.stringify(items)}, ${total}, ${createdAt})
  `;
  return getOrderById(id);
}

async function updateOrderStatus(id, status) {
  const sql = getSql();
  await sql`UPDATE orders SET status = ${status}, updated_at = NOW() WHERE id = ${id}`;
  return getOrderById(id);
}

async function deleteOrder(id) {
  const sql = getSql();
  await sql`DELETE FROM orders WHERE id = ${id}`;
}

async function deleteAllOrders() {
  const sql = getSql();
  await sql`DELETE FROM orders`;
}

async function createAdminSession(token) {
  const sql = getSql();
  await sql`
    INSERT INTO admin_sessions (token, expires_at)
    VALUES (${token}, NOW() + INTERVAL '24 hours')
    ON CONFLICT (token) DO NOTHING
  `;
}

async function verifyAdminSession(token) {
  const sql = getSql();
  const rows = await sql`
    SELECT 1 FROM admin_sessions
    WHERE token = ${token} AND expires_at > NOW()
  `;
  return rows.length > 0;
}

async function deleteAdminSession(token) {
  const sql = getSql();
  await sql`DELETE FROM admin_sessions WHERE token = ${token}`;
}

async function initSchema() {
  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      buyer_nombres TEXT NOT NULL,
      buyer_apellidos TEXT NOT NULL,
      buyer_id TEXT NOT NULL,
      buyer_celular TEXT NOT NULL,
      classroom TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'new' CHECK(status IN ('new','cooking','ready','done')),
      items JSONB NOT NULL,
      total DECIMAL(10,2) NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS admin_sessions (
      token TEXT PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      expires_at TIMESTAMPTZ NOT NULL
    )
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status)
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at DESC)
  `;
}

module.exports = {
  ensureSchema,
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  deleteOrder,
  deleteAllOrders,
  createAdminSession,
  verifyAdminSession,
  deleteAdminSession,
  initSchema,
};
