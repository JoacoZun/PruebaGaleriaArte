const { pool } = require('../config/db');

exports.create = async ({ user_id, precio_total, direccion, obras_id }) => {
  // Crea la orden de compra en la tabla correspondiente
  const result = await pool.query(
    `INSERT INTO orders (
        user_id, precio_total, direccion
      ) 
      VALUES ($1, $2, $3) RETURNING *`,
    [user_id, precio_total, direccion]
  );

  const order = result.rows[0];

  // Lee el array con IDs de obras compradas y el order.id recién retornado
  // y crea las filas de intersección en la tabla 'order_obras'
  for (const obra_id of obras_id) {
    await pool.query(
      `
      INSERT INTO
       orders_obra (order_id, obra_id)
      VALUES
        ($1, $2) RETURNING *
      `,
      [order.id, obra_id]
    );
  }
  return { order };
};

exports.getAll = async () => {
  const result = await pool.query(`SELECT * FROM orders`);
  return { orders: result.rows };
};

exports.getById = async (orderId) => {
  const result = await pool.query(`SELECT * FROM orders WHERE id = $1`, [
    orderId,
  ]);
  return { order: result.rows[0] };
};

exports.getAllByUserId = async (userId) => {
  const result = await pool.query(`SELECT * FROM orders WHERE user_id = $1`, [
    userId,
  ]);
  return { orders: result.rows };
};

exports.cancelById = async (orderId) => {
  const result = await pool.query(
    `UPDATE orders SET estado = 'cancelada', updated_at = NOW() WHERE id = $1 RETURNING *`,
    [orderId]
  );
  return { order: result.rows[0] };
};

exports.updateById = async (orderId, estado) => {
  const result = await pool.query(
    `UPDATE orders SET estado = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
    [estado, orderId]
  );
  return { order: result.rows[0] };
};

exports.checkIfBelongsToUser = async (orderId, userId) => {
  const result = await pool.query(
    `SELECT EXISTS( SELECT 1 FROM orders WHERE id = $1 AND user_id = $2 )`,
    [orderId, userId]
  );
  return result.rows[0].exists;
};
