function construir(muro){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            muro.contruido = true;

            const error = muro.contruido
                ? null
                : new Error('No se pudo construir');

            if(error) 
                reject(error); // Se termina la ejecución con reject
                
            // Si no hubo error, al terminar la promesa devolvera el muro en el resolve
            resolve(muro);
        }, 1000);
    });
};


function aplanar(muro){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            muro.aplanado = true;

            const error = muro.contruido && muro.aplanado
                ? null
                : new Error('No se pudo aplanar');

            if(error) 
                reject(error); // Se termina la ejecución con reject
                
            // Si no hubo error, al terminar la promesa devolvera el muro en el resolve
            resolve(muro);
        }, 1000);
    });
};


function pintar(muro){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            muro.pintado = true;

            const error = muro.contruido && muro.aplanado && muro.pintado
                ? null
                : new Error('No se pudo pintar');

            if(error) 
                reject(error); // Se termina la ejecución con reject
                
            // Si no hubo error, al terminar la promesa devolvera el muro en el resolve
            resolve(muro);
        }, 1000);
    });
};


const muro = {}; //objeto vacio

// ya que la función contruir es una promesa, no podemos mandarla llamar así nada más, debemos inicializarla en una variable
const promesa = construir(muro);

// Esta es una versión resumida de la función de abajo.
promesa
    .then((muroConstruido) => {
        console.log(muroConstruido) 
        return aplanar(muroConstruido)
    })
    .then((muroAplanado) => {
        console.log(muroAplanado);
        return pintar(muroAplanado);
    })
    .then((muroPintado) => {
        console.log(muroPintado);
    })
    .catch((error) => {
        console.error(error);
    })
    .finally(() => {
        console.info("El finally siempre se va a ejecutar")
    });

// Esta función hace lo mismo que la de arriba, pero es más larga:
// promesa
//     .then((muroConstruido) => {
//         console.log("Ya se construyo ", muroConstruido);

//         //Podemos a mandar a llamar aplanar directamente sin una const
//         aplanar(muroConstruido)
//             .then((muroAplanado) => {
//                 console.log("Ya se aplano ", muroAplanado);

//                 pintar(muroAplanado)
//                     .then((muroPintado) => {
//                         console.log("Ya se pinto ", muroPintado);
//                     })
//                     .catch((error) => {
//                         console.error(error);
//                     });
//             })
//             .catch((error) => {
//                 console.error(error);
//             });
//     })
//     .catch((error) => {
//         console.error(error);
//     });


