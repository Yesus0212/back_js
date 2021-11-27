const express = require('express');
const routerKoders = require('./routers/koders')
const routerMentores = require('./routers/mentores')

const port = 8080;

const app = express();

app.use(express.json()); 

// Con esta línea manejamos las rutas definidas desde el archivo koders.js
app.use('/koders', routerKoders);
app.use('/mentores', routerMentores);

// Aquí se inicia el server o app
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});