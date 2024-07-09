const pool = require('../config/db');

const createReminder = async (req, res) => {
  try {
    const { title, description, remindAt } = req.body;
    const reminder = await pool.query(
      'INSERT INTO reminders (user_id, title, description, remind_at, created_at) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP) RETURNING *',
      [req.user.id, title, description, remindAt]
    );
    res.status(201).json(reminder.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getReminders = async (req, res) => {
  try {
    const reminders = await pool.query('SELECT * FROM reminders WHERE user_id = $1', [req.user.id]);
    res.status(200).json(reminders.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateReminder = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, remindAt } = req.body;
    const result = await pool.query(
      'UPDATE reminders SET title = $1, description = $2, remind_at = $3 WHERE id = $4 AND user_id = $5 RETURNING *',
      [title, description, remindAt, parseInt(id, 10), req.user.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Reminder not found or user unauthorized' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteReminder = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'DELETE FROM reminders WHERE id = $1 AND user_id = $2 RETURNING *',
      [parseInt(id, 10), req.user.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Reminder not found or user unauthorized' });
    }
    res.status(200).json({ message: 'Reminder deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createReminder, getReminders, updateReminder, deleteReminder };
