const express = require('express');

const server = express(); // tambien le llaman server
const port = 8080;

// definimos un handler
// para la ruta localhost:8080/ para el metodo GET
server.get('/', (req, res) => {
    res.send('Hola Koders');
});

// Post
server.post('/', (req, res) => {
    res.send('Aquí puedes crear koders');
});

// Aquí se inicia el server o app
server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});