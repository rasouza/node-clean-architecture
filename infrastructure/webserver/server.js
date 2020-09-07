const each = require('lodash/fp/each')
const restify = require('restify')

module.exports = ({ routes }) => {
  const server = restify.createServer()
  server.use(restify.plugins.bodyParser())

  each(route => {
    server[route.method](route.path, route.handler)
  })(routes)

  server.listen(8080, () => {
    console.log(`${server.name} listening at ${server.url}`)
  })

  return server
}
