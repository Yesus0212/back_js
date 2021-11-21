const express = require('express');
const fs = require('fs/promises');

const server = express(); // tambien le llaman server
server.use(express.json());
const port = 8080;

const file = 'koders.json';

// Leemos el archivo koders.json, se convierte a un objeto JSON para despues enviarlo como respuesta
server.get('/koders', async (req, res) => {
    let result;
    try {
        result = await fs.readFile(file, 'utf-8');           
    }
    catch(error){
        console.error(error);
    }

    const response = JSON.parse(result);
    res.json(response);
});

// Recibimos un objeto JSON, para insertarlo como elemento nuevo dentro del archivo de koders.json
server.post('/koders', async (req, res) => {

    const newElement = req.body;

    const result = {
        code: "",
        message: ""
    };

    let info;
    try {
        info = await fs.readFile(file, 'utf-8');
    }
    catch(error){
        console.error(error);
        result.code = "01";
        result.message = `No es posible encontrar el archivo ${file}`;
    }
    
    const objInfo = JSON.parse(info);
    objInfo.koders.push(newElement);
    
    const koders = JSON.stringify(objInfo);
    
    try {
        info = await fs.writeFile(file, koders, 'utf-8');
        result.code = "00";
        result.message = "Insercion existosa";    
    }
    catch(error){
        console.error(error);
        result.code = "02";
        result.message = "Error al crear el registro nuevo";
    }

    res.send(result);
});

// Aquí se inicia el server o app
server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});