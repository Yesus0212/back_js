require('dotenv').config();

const dbConnect = require('./src/lib/db');
const server = require('./src/lib/server')

dbConnect(process.env)
    .then(() => {
        console.log('DB Connected!');

        server.listen(process.env.PORT, () => {
            console.log('Server is running');
        });
    })
    .catch((error) => {
        console.error(error);
    })