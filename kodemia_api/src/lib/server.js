const express = require('express');
const koder = require('../routers/koders.router');
const logger = require('../middlewares/logger')

const server = express();

server.use(express.json());
server.use(logger);

server.use('/koders', koder);


module.exports = server;
