const controllers = require('../controller/home');

module.exports = function (fastify, opts, done) {
    fastify.get('/', controllers.index);
    fastify.post('/initiate-order', controllers.initiateOrder);
    fastify.post('/verify-order', controllers.verifyTransaction);
    done();
};