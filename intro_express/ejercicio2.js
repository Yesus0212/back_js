const express = require('express');
const fs = require('fs/promises');

const server = express(); // tambien le llaman server
const port = 8080;

// definimos un handler
// para la ruta localhost:8080/ para el metodo GET
server.get('/koders', async (req, res) => {

    let result;

    try {
        result = await fs.readFile('koders.json', 'utf-8');           
    }
    catch(error){
        console.error(error);
    }

    const response = JSON.parse(result);
    res.json(response);
});


// Aquí se inicia el server o app
server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});