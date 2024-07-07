const pool = require('../config/db');

const User = {
    create: async (user) => {
        const result = await pool.query('INSERT INTO users ...', [user]);
        return result.rows[0];
    },
    findByEmail: async (email) => {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0];
    },
    // Otros métodos...
};

module.exports = User;
