function retirarDinero(cantidad) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('procesando tu dinero');
            console.log(`la cantidad a retirar es: ${cantidad}.00`);

            if(cantidad < 1)
                reject('$0.00');

            resolve(`$${cantidad}.00`);
        }, 2000);
    });
};

retirarDinero(1000)
    .then((dinero) => {
        console.log('mi dinero :D');
        console.log(dinero);

        return retirarDinero(49);
    })
    .then((dinero) => {
        console.log('mi dinero :>');
        console.log(dinero);
    })
    .catch((dinero) => {
        console.log(dinero);
    })