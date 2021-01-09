const each = require('lodash/fp/each')
const fastify = require('fastify')

module.exports = ({ routes, LoggerConfig }) => {
  const server = fastify({
    logger: LoggerConfig
  })

  each(path => {
    server.route(path)
  })(routes)

  return server
}
