const express = require('express');
const router = express.Router();

// Definir las rutas aquí
router.post('/register', (req, res) => {
    res.send('Registro de usuario');
});

// Exportar el router
module.exports = router;
