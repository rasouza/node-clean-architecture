const each = require('lodash/fp/each')

exports = module.exports = (restify, routes) => {
  const server = restify.createServer()
  server.use(restify.plugins.bodyParser())

  each(route => {
    server[route.method](route.path, route.handler)
  })(routes)

  return server
}

exports['@singleton'] = true
exports['@require'] = ['restify', 'ports/http/routes']
