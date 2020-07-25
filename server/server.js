require('./config/config');

const express = require('express');
const app = express();

const path = require('path')

// Configuración global de rutas
app.use(require('./routes/index'));

app.listen(process.env.PORT, () => {
	console.log('Escuchando puerto:', process.env.PORT);
});