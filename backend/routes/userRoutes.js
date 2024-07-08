/*const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', authMiddleware, getUser);
router.get('/test-connection', testConnection);

module.exports = router;*/



const express = require('express');
const router = express.Router();
const { testConnection } = require('../controllers/userController');

router.get('/test-connection', testConnection);

module.exports = router;
