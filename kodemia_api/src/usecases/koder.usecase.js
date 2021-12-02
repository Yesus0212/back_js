const Koder = require('../models/koder.model');

async function getAllKoders() {
    const allKoders = await Koder.find({});
    return allKoders;
}

async function setKoder(request) {
    const {name, lastName, gender, age} = request;    
    const setKoder = await Koder.create({
        name,
        lastName,
        gender,
        age
    });
    return setKoder;
}

async function deleteKoder(request) {
    const id = request;  
    
    console.log(id);
    
    const deleteKoder = await Koder.findByIdAndDelete(id);
    return deleteKoder;
}

module.exports = {
    getAllKoders,
    setKoder,
    deleteKoder,
};