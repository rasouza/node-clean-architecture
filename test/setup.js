const startHttp = require('../infrastructure/webserver/fastify')
const bootstrap = require('../infrastructure/bootstrap')

if (process.env.NODE_ENV === 'test') process.env.DB_DRIVER = 'in-memory'

const container = bootstrap()

exports.mochaHooks = {
  beforeAll (done) {
    startHttp(container)
    done()
  }
}
