const mongoose = require('mongoose');

// Datos par la conexicón con la BD
const DB_USER = "jesus";
const DB_PASS = "Mrch0212";
const DB_HOST = "cluster0.bjkh3.mongodb.net";
const DB_NAME = "kodemia";

const URL = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

// Para usar mongoose, debemos crear primero un Schema, que básicamente es la estructura del documento (registro) a insertar
// Lo mínimo que se necesita para generar el Schema, es el nombre de la propiedad y el tipo
const koderSchema = new mongoose.Schema(
    {
        name: {
            // Podemos describir más a detalle el Schema
            type: String,
            minlength: 3, // Esta propiedad define que el largo mínimo de un String es 3
            maxlength: 100, // Esta propiedad define que el largo máximo de un String es 100
            required: true // Esta propiedad define que el campo es requerido
        },
        lastName: {
            type: String,
            minlength: 3,
            maxlength: 100,
            required: true
        },
        age: {
            type: Number,
            min: 0, // Esta propiedad define que el valor mínimo de un Number es 0   
            max: 99 // Esta propiedad define que el valor máximo de un Number es 0
        },
        gender: {
            type: String,
            maxlength: 1,
            enum: ["m", "f", "x"], // Esta propiedad, permite definir un arreglo con las opciones validas para el campo
            required: true
        }
    }
);

// Para usar mongoose, debemos crear también un Modelo, el cual requiere el nombre de la collection y el Schema
// Hay que tener cuidado con el nombre de la collection, porque si no, mongoose va a crear una collection con el nombre que enviemos
const Koder = mongoose.model('koders', koderSchema);

mongoose
    .connect(URL)
    .then(async (connection) => {
        console.log('DB Connected');
        
        // Esta es la versión larga para insertar

        // Creamos una instancia del modelo para insertar un nuevo Documento
        // const newKoder = new Koder(
        //     {
        //         name: "Jesus",
        //         lastName: "Solis",
        //         age: 36,
        //         gender: "m"
        //     }
        // );

        // Utilizamos el metodo create y pasamos la instancia
        // await Koder.create(newKoder);

        // Esta es la versión corta para insertar
        // Mandamos directamente el objeto en la función create del modelo
        await Koder.create(
            {
                name: "Aurora",
                lastName: "Escalera",
                age: 23,
                gender: "f"
            }
        );
            
        const koders = await Koder.find({});
        console.log(koders);

    })
    .catch((error) => {
        console.error(error);
    })