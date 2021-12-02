const Koder = require('../usecases/koder.usecase');

async function getKoder(request, response) {
    try {
        const allKoders = await Koder.getAllKoders();

        response.statusCode = 200;
        response.json({
            success: true,
            message: 'All Koders',
            data: {
                Koders: allKoders
            }
        })
    }
    catch(error) {
        console.error(error);
        response.statusCode = 500;
        response.json({
            success: false,
            message: 'Could not get Koders',
            error
        });
    }
};


async function setKoder(request, response) {
    try {

        const newKoder = request.body;

        const setKoder = await Koder.setKoder(newKoder);

        response.statusCode = 200;
        response.json({
            success: true,
            message: 'Koder Insert',
            data: {
                newKoder
            }
        })
    }
    catch(error) {
        console.error(error);
        response.statusCode = 500;
        response.json({
            success: false,
            message: 'Could not set new Koder',
            error
        });
    }
};


async function deleteKoder(request, response) {
    try {

        const id = request.params.id;

        const deleteKoder = await Koder.deleteKoder(id);

        response.statusCode = 200;
        response.json({
            success: true,
            message: 'Delete Koder',
            data: {
                deleteKoder
            }
        })
    }
    catch(error) {
        console.error(error);
        response.statusCode = 500;
        response.json({
            success: false,
            message: 'Could not delete a Koder',
            error
        });
    }
};


module.exports = {
    getKoder,
    setKoder,
    deleteKoder,
};