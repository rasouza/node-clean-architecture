const each = require('lodash/fp/each')
const fastify = require('fastify')

module.exports = ({ routes, LoggerConfig }) => {
  const server = fastify({
    logger: LoggerConfig
  })

  each(route => {
    server.route(route)
  })(routes)

  server.listen(3000, (err, address) => {
    if (err) {
      server.log.error(err)
      process.exit(1)
    }
  })

  return server
}
