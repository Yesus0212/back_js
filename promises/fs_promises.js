const fs = require('fs/promises');

async function createFile(file, data){
    try {        
        await fs.writeFile(file, data, 'utf8');
        console.log("Se creo el archivo correctamente");
    }
    catch(error){
        console.error(error);
    }
};

async function deleteFile(file){
    try {
        await fs.unlink(file);
        console.log("Se eliminó el archivo")
    }
    catch(error){
        console.error(error);
    }
};

async function editFile(file, dataAct){
    try {        
        await fs.appendFile(file, dataAct, 'utf8');
        console.log("Archivo actualizado")
    }
    catch(error){
        console.error(error);
    }
};

async function readFile(file){
    try {
        const result = await fs.readFile(file, 'utf-8');
        console.log("contenido: ", result);
    }
    catch(error){
        console.error(error);
    }
};

async function createDir(directory){
    try {
        const dir = await fs.mkdir(directory);
        console.log("se creó el directorio correctamente");
    }
    catch(error){
        console.error(error);
    }
};

async function deleteDir(directory){
    try {
        const dir = await fs.rmdir(directory);
        console.log("se eliminó el directorio correctamente");
    }
    catch(error){
        console.error(error);
    }
};


async function openDir(directory){
    try {
        const content = await fs.readdir(directory);
        console.log(content);
    }
    catch(error){
        console.error(error);
    }
};


async function crudFile(){

    const data = "Hola mundo Async promises WriteFile";
    const dataAct = "Más info";
    const file = "file.txt"
    const directory = "dirTest"

    try {
        await createFile(file, data);
        await readFile(file);
        await editFile(file, dataAct);
        await readFile(file);
        await deleteFile(file);

        await createDir(directory);
        await deleteDir(directory);
        await createDir(directory);
        await createFile(directory+"/"+file, data);
        await openDir(directory);
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


// Esta forma, a veces se encuentra en Prod, pero se considera mala práctica
// (async () => {
//     await crearArchivo('ejercicio.txt', 'este sera su ejercicio de mañana');
//     console.log('se ejecutaron todas las funciones');
// })()