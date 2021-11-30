const express = require('express');
const cors = require('cors');
const routerKoders = require('./routers/koders');
const routerMentores = require('./routers/mentores');


const port = 8080;

const app = express();

app.use(express.json()); 
app.use(cors());
app.options('*', cors());


// Los Middleware son funciones que quieres que se ejecuten siempre
app.use((req, res, next) => {
    console.log('Middleware de aplicacion');
    next(); // Salta al siguiente paso
});

// Con esta línea manejamos las rutas definidas desde el archivo koders.js
app.use('/koders', routerKoders);
app.use('/mentores', routerMentores);


// Middleware a nivel de endPoint
app.use('/paginas', (req, res, next) => {
    console.log("Endpoint unicamente de /paginas");
    next();
});

// Aquí se inicia el server o app
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});