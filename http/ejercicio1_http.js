const http = require('http');

const port = 8080;

// Creamos un servidor, usando createServer
const server = http.createServer((request, response) => {
    // le definimos el header, con writeHead
    // response.writeHead(200, {});
    
    const metodo = request.method;
    const url = request.url;

    const messaje = {
        message: '',
    };
    
    if(metodo.includes("GET") && url.includes("/koder"))
        messaje.message = "Aquí Están Todos Los Koders";
    else if(metodo.includes("POST") && url.includes("/koder"))
        messaje.message = "Aquí Puedes Crear Koders";
    else
        messaje.message = "No Se Que Hacer! Aiuda";

    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/json');

    const result = JSON.stringify(messaje)

    /********La diferencia entre el response write y el end, es que puedo
    Tener varios response write y continuario imprimiendolos
    Pero solo puedo tener un responde end, ya que este cierra la
    respuesta*********/
    // response.write('<h1>Hello World!</h1>');
    response.end(result);
});


// arrancamos el servidor
server.listen(port, () => {
    console.log(`El servidor arranco en el puerto ${port}`);
});