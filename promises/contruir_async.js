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


// El async await, es preferible utilizarlo cuando tienes más de una promesa

async function ejecutarConstruccion() {    
    const muro = {}; //objeto vacio
    
    try{
        const muroConstruido = await construir(muro);
        const muroAplanado = await aplanar(muroConstruido);
        const muroPintado = await pintar(muroAplanado);
    }
    catch(error) {
        console.error(error);
    }
    finally{
        console.log("se cierra");
    }

    console.log(muroPintado);
};


ejecutarConstruccion();
