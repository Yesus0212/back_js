const fs = require('fs/promises');

async function createFile(){
    try {
        const data = "Hola mundo Async promises WriteFile";
        await fs.writeFile('mensaje.txt', data, 'utf8');
        console.log("Se creo el archivo correctamente");
    }
    catch(error){
        console.error(error);
    }
};

async function deleteFile(){
    try {
        await fs.unlink('mensaje.txt');
        console.log("Se eliminó el archivo")
    }
    catch(error){
        console.error(error);
    }
};

async function editFile(){
    try {
        const dataAct = "Más info";
        await fs.appendFile('mensaje.txt', dataAct, 'utf8');
        console.log("Archivo actualizado")
    }
    catch(error){
        console.error(error);
    }
};

async function readFile(){
    try {
        const file = await fs.readFile('mensaje.txt', 'utf-8');
        console.log("contenido: ",file);
    }
    catch(error){
        console.error(error);
    }
};


async function crudFile(){
    try {
        await createFile();
        await readFile();
        await editFile();
        await readFile();
        await deleteFile();
    }
    catch(error){
        console.log(error);
    }
};

crudFile();




// Esta forma es mejor
// const execute = async () => {
//     await crearArchivo('ejercicio.txt', 'este sera su ejercicio de mañana');
//     console.log('se ejecutaron todas las funciones');
// };

// execute();


// Esta forma, a veces se encuentra ahí
// (async () => {
//     await crearArchivo('ejercicio.txt', 'este sera su ejercicio de mañana');
//     console.log('se ejecutaron todas las funciones');
// })()