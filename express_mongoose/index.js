const express = require('express');
const mongoose = require('mongoose');
const Koder = require('./koder.model');  // Aquí import

const PORT = 8080;

// Datos par la conexicón con la BD
const DB_USER = "jesus";
const DB_PASS = "Mrch0212";
const DB_HOST = "cluster0.bjkh3.mongodb.net";
const DB_NAME = "kodemia";

const URL = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

const app = express();

app.get('/', (req, res) => {
    res.end('Server is running')
});

app.get('/koders', async (req, res) => {
    const koders = await Koder.find({});
    res.json(koders);
});

app.get('/koders', async (req, res) => {
    const koders = await Koder.find({});
    res.json(koders);
});

app.post('/koders', async (req, res) => {
    const koder = req.body;
    try {
        await Koder.create(koder);
    }
    catch(error){
        console.log(error);
    }
    
});





// Es una promesa (por lo que es asincrono)
mongoose
    .connect(URL)
    .then((connection) => {
        console.log('DB Connected');      
        
        // Asincrono con un callback, cuando ya se levanto la BD, se levantara el server.
        app.listen(PORT, () => {
            console.log('Server is running');
        });
    })
    .catch((error) => {
        console.error(error);
    })


