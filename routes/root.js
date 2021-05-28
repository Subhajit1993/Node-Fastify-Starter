
module.exports = function (fastify, opts, done) {
    fastify.get('/test-order', (request, response)=>{
        var view = 'public/test_page.hbs'
        response
            .code(200)
            .view(view, {})
    });
    done();
};