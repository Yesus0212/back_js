async function ejecutaPromesas() {
    const resultado1 = await promesa1();
    const resultado2 = 'texto: ' + resultado1;

    return resultado1;
};