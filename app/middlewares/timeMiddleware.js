const timeMiddleware = (request, response, next) => {
    console.log(`Logged Time: ${new Date()} `);
    next();
}
module.exports = { timeMiddleware };