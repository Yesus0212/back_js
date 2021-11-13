const fs = require('fs');

function createFile (nameFile, contentFile){
    fs.writeFile(nameFile, contentFile,'utf8', (error) => {
        if(error) 
            console.error(error);
        else 
            console.info(`El archivo ${nameFile}, se creo correctamente`);    
    });
}

function deleteFile (nameFile){
    fs.unlink(nameFile, (error) => {
        if(error) console.error(error);
        else console.info(`El archivo ${nameFile}, se elimino correctamente`);
    })
}


function editFile (nameFile, contentUpdate){
    fs.appendFile(nameFile, contentUpdate, 'utf8', (error) => {
        if(error) console.error(error);
        else console.info(`El archivo ${nameFile}, se actualizó correctamente`)
    });
};


function readFile (nameFile){
    fs.readFile(nameFile, 'utf8', function(error, data){
        if(error) console.error(error);
        else console.log(`El contenido del archivo ${nameFile} es: ${data}`);
    });
};

// createFile("Hola.txt", "Archivo nuevo");
// deleteFile("Hola.txt");
// editFile("Hola.txt", "Nuevo contenido");
readFile("Hola.txt");