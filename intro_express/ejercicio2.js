const express = require('express');
const fs = require('fs/promises');

const server = express(); // tambien le llaman server
server.use(express.json()); // Sirve para poder leer en el Body del request, el json que se esta enviando
const port = 8080;

const file = 'koders.json';  // constante con el nombre del archivo

// Leemos el archivo koders.json, se convierte a un objeto JSON para despues enviarlo como respuesta
server.get('/koders', async (req, res) => {

    let koders;

    const result = {
        code: "",
        message: "",
    };

    koders = await getKoders();

    if(koders.length != 0){
        result.code = "00";
        result.message = `Operacion exitosa`
    }
    else{
        result.code = "01";
        result.message = `No fue posible encontrar el archivo ${file}`
    }
   
    res.json({...result, ...koders});
});

// Recibimos un objeto JSON, para insertarlo como elemento nuevo dentro del archivo de koders.json
server.post('/koders', async (req, res) => {

    const koder = req.body;  // Aquí se recupera del request el objeto JSON que se esta enviando en el body y lo almaceno en la constante newElement
    let koders;

    const result = {
        code: "",
        message: ""
    };

    koders = await getKoders();

    if(koders.length == 0){
        result.code = "01";
        result.message = `No fue posible encontrar el archivo ${file}`

        res.send(result);
        return;
    }

    if(!isValidKoder(koder)){
        result.code = "02";
        result.message = `Datos invalidos`

        res.send(result);
        return;
    }

    koders.koders.push(koder);  // Le agrego el nuevo elemento
    
    const validSave = await saveKoders(koders);

    if(validSave){
        res.statusCode = 201;
        result.code = "00";
        result.message = "Insercion existosa"; 
    }
    else{        
        result.code = "03";
        result.message = "Error al crear el registro nuevo";
    }

    res.send({...result, koder});
});


// Recibimos un objeto JSON, actualizarlo e insertarlo nuevamente en el archivo .json
/**
 * Para accesar parámetros en el url, tal como lo es el id, es necesario definir el parámetro en un patrón de la url utilizando 
 * el símbolo “:” seguido del nombre del parámetro, el cual podrá ser accesado después mediante req.params.
 */

/**
 * Si los parametros vieneran en la url con la sintaxis de ?id= se tendría que exportar 'querystring' (require('queryString')) y luego acceder al parametro
 * de esta forma let id = req.query.id
 */

server.patch('/koders/:id', async (req, res) => {

    // Aquí obtengo el id enviado como parametro de ruta, pero no se desde donde recibiria la información a actualizar
    // ******************  PREGUNTARLE A OSCAR ****************************************//
    const koderId = req.params.id;    
    const koder = req.body;
    let koders;

    const result = {
        code: "",
        message: ""
    };
    
    koders = await getKoders();

    if(koders.length == 0){
        result.code = "01";
        result.message = `No fue posible encontrar el archivo ${file}`

        res.send(result);
        return;
    }

    if(!isValidKoder(koder)){
        result.code = "02";
        result.message = `Datos invalidos`

        res.send(result);
        return;
    }
    
    const koderIndex = koders.koders.findIndex((koder) => koder.nombre === koderId);

    if(koderIndex === -1) {
        result.code = "03";
        result.message = "El koder no se encuentra en el archivo"

        res.send(result);

        return;
    }

    koders.koders[koderIndex].nombre = koder.nombre;
    koders.koders[koderIndex].genero = koder.genero;

    const validSave = await saveKoders(koders);

    if(validSave){
        result.code = "00";
        result.message = "Actualizacion existosa"; 
    }
    else{        
        result.code = "04";
        result.message = "Error al actualizar el registro nuevo";
    }

    res.send({...result, ...koders});
});


server.get('/koders/:id', async (req, res) => {

    // Aquí obtengo el id enviado como parametro de ruta
    const koderId = req.params.id;

    console.log(koderId);

    let result = {
        code: "",
        message: "",
        koder: ""
    };

    let initData;
    try {
        initData = await fs.readFile(file, 'utf-8');
    }
    catch(error){
        console.error(error);
        result.code = "01";
        result.message = `No es posible encontrar el archivo ${file}`;
    }
    
    try {
        const objInfo = JSON.parse(initData); // Parseo la información obtenida del archivo .json
        const filterKoder = objInfo.koders.filter(koder => {
            return koder.nombre === koderId;
        });

        if(filterKoder.length){
            result.code = "00";
            result.message = "Busqueda exitosa";
    
            result.koder = filterKoder;
        
            const koder = JSON.stringify(result, null, 4);  // Vuelvo a convertir el objeto, para enviarlo como respuesta    
        }        
        else{
            result.code = "03";
            result.message = `El koder ${koderId} no se encuentra en el archivo`;
        }
    }
    catch(error){
        result.code = "02";
        result.message = `Error al buscar al koder ${koderId}`;
    }
    
    res.send(result);
});

server.delete('/koders/:id', async (req, res) => {

    // Aquí obtengo el id enviado como parametro de ruta
    const koderId = req.params.id;

    console.log(koderId);

    let result = {
        code: "",
        message: "",
    };

    let initData;
    try {
        initData = await fs.readFile(file, 'utf-8');
    }
    catch(error){
        console.error(error);
        result.code = "01";
        result.message = `No es posible encontrar el archivo ${file}`;
    }
    
    try {
        const objInfo = JSON.parse(initData); // Parseo la información obtenida del archivo .json

        const filterKoder = {
            koders : ""
        };
        
        filterKoder.koders = objInfo.koders.filter(koder => { // Hago un filtrado de los elemento, sin regresar el que quiero eliminar
            return koder.nombre !== koderId; // Como al filtrar me devuelve un arreglo, sin la estructura inicial, generé el objeto filterKoder para que se guardara correctamente
        });

        if(filterKoder.koders.length){
            result.code = "00";
            result.message = "Eliminacion exitosa";

            const koders = JSON.stringify(filterKoder, null, 4);
    
            initData = await fs.writeFile(file, koders, 'utf-8');
        }        
        else{
            result.code = "03";
            result.message = `El koder ${koderId} no se encuentra en el archivo`;
        }
    }
    catch(error){
        result.code = "02";
        result.message = `Error al eliminar al koder ${koderId}`;
    }
    
    res.send(result);
});


async function getKoders(){

    let dataParse;

    try {
        const data = await fs.readFile(file, 'utf-8');
        if(data != null)
            dataParse = JSON.parse(data);

        return dataParse; 
    }
    catch(error){
        return [];
    }    
}

async function saveKoders(dataKoders){
      
      try {
          // En el Stringify, le agrego el null para que no transforme nada y el número 4 que indica la indentación.
          const koders = JSON.stringify(dataKoders, null, 4);  // Vuelvo a convertir el objeto, para poder almacenarlo en el archivo, ya con el nuevo elemento agregado      
          await fs.writeFile(file, koders, 'utf-8');
          
          return true;
      }
      catch(error){
          return false;
      }
}

function isValidKoder(koder) {
    return koder.nombre && koder.genero
}


// Aquí se inicia el server o app
server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});