const express = require('express');
const fs = require('fs/promises');

const file = 'koders.json'; 

const router = express.Router();

router.get('/', async (req, res) => {
    let mentores;

    const result = {
        code: "",
        message: "",
    };

    mentores = await getMentores();

    if(mentores.length != 0){
        result.code = "00";
        result.message = `Operacion exitosa`
    }
    else{
        result.code = "01";
        result.message = `No fue posible encontrar el archivo ${file}`
    }
   
    res.json({...result, ...mentores});
});


router.post('/', async (req, res) => {
    const mentor = req.body;
    let mentores;

    const result = {
        code: "",
        message: ""
    };

    mentores = await getMentores();

    if(mentores.length == 0){
        result.code = "01";
        result.message = `No fue posible encontrar el archivo ${file}`

        res.send(result);
        return;
    }

    if(!isValidMentor(mentor)){
        result.code = "02";
        result.message = `Datos invalidos`

        res.send(result);
        return;
    }

    mentores.mentores.push(mentor);
    
    const validSave = await saveMentores(mentores);

    if(validSave){
        res.statusCode = 201;
        result.code = "00";
        result.message = "Insercion existosa"; 
    }
    else{        
        result.code = "03";
        result.message = "Error al crear el registro nuevo";
    }

    res.send({...result, mentor});
});


router.patch('/:id', async (req, res) => {
    const mentorId = req.params.id;    
    const mentor = req.body;
    let mentores;

    const result = {
        code: "",
        message: ""
    };
    
    mentores = await getMentores();

    if(mentores.length == 0){
        result.code = "01";
        result.message = `No fue posible encontrar el archivo ${file}`

        res.send(result);
        return;
    }

    if(!isValidMentor(mentor)){
        result.code = "02";
        result.message = `Datos invalidos`

        res.send(result);
        return;
    }
    
    const mentorIndex = mentores.mentores.findIndex((mentor) => mentor.nombre === mentorId);

    if(mentorIndex === -1) {
        result.code = "03";
        result.message = "El mentor no se encuentra en el archivo"

        res.send(result);

        return;
    }

    mentores.mentores[mentorIndex].nombre = mentor.nombre;
    mentores.mentores[mentorIndex].genero = mentor.genero;

    const validSave = await saveMentores(mentores);

    if(validSave){
        result.code = "00";
        result.message = "Actualizacion existosa"; 
    }
    else{        
        result.code = "04";
        result.message = "Error al actualizar el registro nuevo";
    }

    res.send({...result, ...mentores});
});


router.get('/:id', async (req, res) => {
    const mentorId = req.params.id;

    console.log(mentorId);

    let result = {
        code: "",
        message: "",
        mentor: ""
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
        const filterMentor = objInfo.mentores.filter(mentor => {
            return mentor.nombre === mentorId;
        });

        if(filterMentor.length){
            result.code = "00";
            result.message = "Busqueda exitosa";
    
            result.mentor = filterMentor;
        
            const mentor = JSON.stringify(result, null, 4); 
        }        
        else{
            result.code = "03";
            result.message = `El mentor ${mentorId} no se encuentra en el archivo`;
        }
    }
    catch(error){
        result.code = "02";
        result.message = `Error al buscar al mentor ${mentorId}`;
    }
    
    res.send(result);
});

router.delete('/:id', async (req, res) => {
    const mentorId = req.params.id;

    console.log(mentorId);

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

        const filterMentor = {
            mentores : ""
        };
        
        filterMentor.mentores = objInfo.mentores.filter(mentor => { 
            return mentor.nombre !== mentorId; 
        });

        if(filterMentor.mentores.length){
            result.code = "00";
            result.message = "Eliminacion exitosa";

            const mentores = JSON.stringify(filterMentor, null, 4);
    
            initData = await fs.writeFile(file, mentores, 'utf-8');
        }        
        else{
            result.code = "03";
            result.message = `El mentor ${mentorId} no se encuentra en el archivo`;
        }
    }
    catch(error){
        result.code = "02";
        result.message = `Error al eliminar al mentor ${mentorId}`;
    }
    
    res.send(result);
});

function isValidMentor(mentor) {
    return mentor.nombre && mentor.genero
}

async function getMentores(){

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

async function saveMentores(dataMentores){
      
      try {          
          const mentores = JSON.stringify(dataMentores, null, 4);
          await fs.writeFile(file, mentores, 'utf-8');
          
          return true;
      }
      catch(error){
          return false;
      }
}

// Por convención, el exports debe ir al final del archivo
module.exports = router;