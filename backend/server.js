/*const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🔥Server on 🔥 http://localhost:${PORT}`);
});*/

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
