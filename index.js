const fastify = require('./server.js')
const swagger = require('./src/config/swagger')
const routes = require('./src/routes/faculty')

fastify.register(require('fastify-swagger'), swagger.options)

routes.forEach((route, index) => {
    fastify.route(route)
})

// Run the server!
const start = async () => {
    try {
        await fastify.listen(3000, '127.0.0.1')
        fastify.swagger()
        fastify.log.info(`server listening on ${fastify.server.address().port}`)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()