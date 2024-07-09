const pool = require('../config/db');

const createFinance = async (req, res) => {
  try {
    const finance = await Finance.createFinance({ ...req.body, userId: req.user.id });
    res.status(201).json(finance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getFinances = async (req, res) => {
  try {
    const finances = await Finance.getFinancesByUser(req.user.id);
    res.status(200).json(finances);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateFinance = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(parseInt(id, 10))) {
      return res.status(400).json({ message: 'Invalid finance ID' });
    }
    const { description, amount, category, type, date } = req.body;
    const financeId = parseInt(id, 10);

    const result = await pool.query(
      'UPDATE finances SET description = $1, amount = $2, category = $3, type = $4, date = $5 WHERE id = $6 AND user_id = $7 RETURNING *',
      [description, amount, category, type, date, financeId, req.user.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Transaction not found or user unauthorized' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteFinance = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(parseInt(id, 10))) {
      return res.status(400).json({ message: 'Invalid finance ID' });
    }
    const financeId = parseInt(id, 10);

    const result = await pool.query(
      'DELETE FROM finances WHERE id = $1 AND user_id = $2 RETURNING *',
      [financeId, req.user.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Transaction not found or user unauthorized' });
    }
    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createFinance, getFinances, updateFinance, deleteFinance };
