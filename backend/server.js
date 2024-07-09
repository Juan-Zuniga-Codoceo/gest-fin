const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const financeRoutes = require('./routes/financeRoutes');
const userRoutes = require('./routes/userRoutes');
const reminderRoutes = require('./routes/reminderRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/finances', financeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reminders', reminderRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🔥Server on 🔥 http://localhost:${PORT}`);
});

