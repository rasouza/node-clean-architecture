const each = require('lodash/fp/each')
const fastify = require('fastify')
const fastifyStatic = require('fastify-static')
const path = require('path')

module.exports = ({ routes, LoggerConfig }) => {
  const server = fastify({
    logger: LoggerConfig
  })

  each(path => {
    server.route(path)
  })(routes)

  /**
   * Setup Docs and Coverage static file serving
   */
  server.register(fastifyStatic, {
    root: path.join(__dirname, '../..'),
    redirect: true
  })
  server.get('/docs/', (req, res) => { res.sendFile('docs/') })
  server.get('/coverage/', (req, res) => { res.sendFile('coverage/') })

  return server
}
