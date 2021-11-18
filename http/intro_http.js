const http = require('http');

const port = 8080;

// Creamos un servidor, usando createServer
const server = http.createServer((request, response) => {
    // le definimos el header, con writeHead
    // response.writeHead(200, {});
    // response.write('<h1>Hello World!</h1>');

    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/json');

    response.end('{"hola": "a todos"}');
});


// arrancamos el servidor
server.listen(port, () => {
    console.log(`El servidor arranco en el puerto ${port}`);
});