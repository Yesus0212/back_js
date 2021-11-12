function generateRoleValidator(roles) {
    return (rol) => {
        if(roles.includes(rol)) {
            console.log('autorizado');
        }
        else{
            console.log('denegado');
        }
    }
};

const onlyAdmin = generateRoleValidator(['admin', 'desarrollador']);

onlyAdmin('desarrollador');
onlyAdmin('admin');


const usuarios = [
    {
        nombre: 'balan',
        rol: 'admin'
    },
    {
        nombre: 'jairo',
        rol: 'desarrollador'
    },
    {
        nombre: 'marco',
        rol: 'calidad'
    }
]

const roles = usuarios.map(usuario => usuario.rol);

roles.forEach(rol => {
    onlyAdmin(rol);
});