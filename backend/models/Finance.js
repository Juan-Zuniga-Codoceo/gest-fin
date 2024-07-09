const pool = require('../config/db');

const createFinance = async (data) => {
  const { userId, description, amount, category, type, date } = data;
  const result = await pool.query(
    'INSERT INTO finances (user_id, description, amount, category, type, date, created_at) VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP) RETURNING *',
    [userId, description, amount, category, type, date]
  );
  return result.rows[0];
};

const getFinancesByUser = async (userId) => {
  const result = await pool.query('SELECT * FROM finances WHERE user_id = $1', [userId]);
  return result.rows;
};

// Otros métodos necesarios...

module.exports = { createFinance, getFinancesByUser };
