function logger(request, response, next) {
    console.log(`[${request.method}] ${request.url} ${JSON.stringify(request.body)}`);

    next();
};


module.exports = logger;