const express = require('express');

const server = express(); // tambien le llaman server
// server.type = "application/json";

const port = 8080;

const saludo = {
    messaje: ""
};

// definimos un handler
// para la ruta localhost:8080/ para el metodo GET
server.get('/koder', (req, res) => {
    saludo.messaje = 'Aquí están todos los koders';
    // Si usamos el metodo json del response, internamente lo convierte a un JSON
    res.json(saludo);
});

// Post
server.post('/koder', (req, res) => {
    saludo.messaje = 'Aquí puedes crear koders';
    // Aunque, express ya es suficientemente inteligente para saber si le mandamos un objeto, lo convierte automaticamente a un json
    res.send(saludo);
});

// Put
server.put('/koder', (req, res) => {
    saludo.messaje = 'Aquí puedes sustituir un koders';
    res.json(saludo);
});

// Aquí se inicia el server o app
server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});