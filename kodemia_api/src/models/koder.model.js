const mongoose = require('mongoose');

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

const Koder = mongoose.model('koders', koderSchema);

// exportamos el modelo koder
module.exports = Koder;