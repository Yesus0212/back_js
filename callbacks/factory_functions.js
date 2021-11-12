function factory(result) {
    console.log('Trabajando...');

    return function() {
        console.log('resultado: ', result);
    }
}

const r = factory('saludos');
r();


function factorySumaParcial(a) {
    return function (b) {
        return a + b;
    }
}

const suma2 = factorySumaParcial(2);
console.log(suma2(5));
// así se ve internamente suma2
// function suma2(b) {
//     return 2 + b;
// }

