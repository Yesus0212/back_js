const fs = require('fs');

fs.writeFile('hola.txt', 'Hola desde FS','utf8', (error) => {
    if(error) {
        console.error(error);
    }
    else {
        console.log('Se creo el archivo correctamente');
    }
    
});


// import {writeFile} from 'fs';

// writeFile('hola.txt', 'Hola Koders', 'utf8', (error) => {
//     if(error) {
//         console.log('Error:' + error);
//     }
//     else {
//         console.log('Se creo el archivo correctamente');
//     }
// });