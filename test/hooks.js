const container = require('../infrastructure/config/container')()
const server = require('../infrastructure/webserver/fastify')

exports.mochaHooks = {
  beforeAll (done) {
    server(container.cradle).listen(3000)
    done()
  }
}
