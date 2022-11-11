const timeMiddleware = (request, response, next) => {
    console.log(`${request.method} ${request.originalUrl} Logged Time: ${new Date()}`);
    next();
}
module.exports = { timeMiddleware };