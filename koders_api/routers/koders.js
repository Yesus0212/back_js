const express = require('express');
const fs = require('fs/promises');

const file = 'koders.json'; 

const router = express.Router();


// Middleware de router
router.use((req, res, next) => {
    console.log('Middleware de Router');
    next();
});

router.get('/', async (req, res) => {
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


router.post('/', async (req, res) => {
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

    koders.koders.push(koder);
    
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


router.patch('/:id', async (req, res) => {
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


router.get('/:id', async (req, res) => {
    const koderId = req.params.id;

    console.log(koderId);

    let result = {
        code: "",
        message: "",
        koder: ""
    };

    koders = await getKoders();

    if(koders.length == 0){
        result.code = "01";
        result.message = `No fue posible encontrar el archivo ${file}`

        res.send(result);
        return;
    }
    
    try {
        const filterKoder = koders.koders.filter(koder => {
            return koder.nombre === koderId;
        });

        if(filterKoder.length){
            result.code = "00";
            result.message = "Busqueda exitosa";
    
            result.koder = filterKoder;
        }        
        else{
            result.code = "03";
            result.message = `El mentor ${koderId} no se encuentra en el archivo`;
        }
    }
    catch(error){
        result.code = "02";
        result.message = `Error al buscar al mentor ${koderId}`;
    }
    
    res.send(result);
});

router.delete('/:id', async (req, res) => {
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
        const objInfo = JSON.parse(initData); 

        const filterKoder = {
            koders : ""
        };
        
        filterKoder.koders = objInfo.koders.filter(koder => { 
            return koder.nombre !== koderId; 
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

function isValidKoder(koder) {
    return koder.nombre && koder.genero
}

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
          const koders = JSON.stringify(dataKoders, null, 4);
          await fs.writeFile(file, koders, 'utf-8');
          
          return true;
      }
      catch(error){
          return false;
      }
}

// Por convención, el exports debe ir al final del archivo
module.exports = router;