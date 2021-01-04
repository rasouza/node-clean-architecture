const each = require('lodash/fp/each')
const restify = require('restify')
const pino = require('restify-pino-logger')

module.exports = ({ routes, LoggerConfig }) => {
  const server = restify.createServer()

  server.use(restify.plugins.bodyParser())
  server.use(pino(LoggerConfig))

  each(route => {
    server[route.method](route.path, route.handler)
  })(routes)

  server.listen(8080, () => {
    console.log(`${server.name} listening at ${server.url}`)
  })

  return server
}
