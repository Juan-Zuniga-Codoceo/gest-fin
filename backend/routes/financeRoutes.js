const express = require('express');
const router = express.Router();
const { createFinance, getFinances, updateFinance, deleteFinance } = require('../controllers/financeController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, createFinance);
router.get('/', authMiddleware, getFinances);
router.put('/:id', authMiddleware, updateFinance); // Asegúrate de que el parámetro id esté correctamente configurado
router.delete('/:id', authMiddleware, deleteFinance); // Asegúrate de que el parámetro id esté correctamente configurado

module.exports = router;
