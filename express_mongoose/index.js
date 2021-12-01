require('dotenv').config(); // Aquí estamos utilizando el archivo .env

const express = require('express');
const mongoose = require('mongoose');
const Koder = require('./koder.model');  // Aquí import

// Datos par la conexicón con la BD
// const PORT = 8080;
// const DB_USER = "jesus";
// const DB_PASS = "Mrch0212";
// const DB_HOST = "cluster0.bjkh3.mongodb.net";
// const DB_NAME = "kodemia";

// Aquí utilizamos las variables obteniendo el valor desde el .env
const PORT = process.env.PORT;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;

const URL = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.end('Server is running')
});

// app.get('/koders', async (req, res) => {
//     const koders = await Koder.find({});
//     res.json(koders);
// });

app.get('/koders', async (req, res) => {
    try{
        const {gender, age, min_age} = req.query;      // Aquí hacemos la destructuración de los parametros que recibimos desde query params  
    
        const filters = {};
    
        if(gender) filters.gender = gender;
        if(age) filters.age = age;
        if(min_age) filters.age = { $gte: min_age };

        const koders = await Koder.find(filters);
    
        res.json(koders);
    }
    catch(error) {
        console.error(error);
        res.statusCode = 500;
        res.end();
    }
});

app.post('/koders', async (req, res) => {    
    try {
        const { name, lastName, gender, age } = req.body;

        const koder = await Koder.create({
            name,
            lastName,
            gender, 
            age
        });

        res.statusCode = 201;
        res.json({
            success: true,
            koder
        });
    }
    catch(error){
        console.log(error);
        res.statusCode = 500;
        res.end();
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


