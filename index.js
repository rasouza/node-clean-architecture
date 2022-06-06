require('dotenv').config()
require('make-promises-safe')

const startHttp = require('./infrastructure/webserver/fastify')
const bootstrap = require('./infrastructure/bootstrap')

const container = bootstrap()
const app = startHttp(container)

app.listen(3000, (err, address) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
})
