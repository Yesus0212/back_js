const mongoose = require('mongoose');

function connect({DB_USER, DB_PASS, DB_HOST, DB_NAME}) {
    const URL = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

    return mongoose.connect(URL);
}

module.exports = connect;
