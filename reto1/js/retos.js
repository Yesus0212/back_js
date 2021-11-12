const numeros = [1,2,5,4,3];

function numMayor (numeros) {
    let mayor = 0;

    for(let index = 0; index < numeros.length; index++){        
        if(numeros[index] > mayor)
            mayor = numeros[index];
    }

    return mayor;
}

// console.log(numMayor(numeros));


const palabra = "hola";

function reversible(palabra){
    let final = "";
    const p = palabra.split("");
    
    
    for(let index = p.length -1; index >= 0; index--){
        final += p[index];
    }

    return final;
}

// console.log(reversible(palabra));


const a = 10;
const b = 0;

function numDividir(a,b){

    let result;

    if(a > 0 && b > 0){
        result = a / b;
    }
    else{
        result = "Error";
    }

    return result;

}


// console.log(numDividir(a,b));



function on (evento, funcion){
    let resultado = "";
    if(evento === 'click')
        resultado = funcion();

    return resultado;
}

function cheers(){
    console.log("hola");
    return 'retorno';
}


// on('click', cheers());
console.log(on('click', cheers));