require('dotenv').config()
require('make-promises-safe')

const startHttp = require('./infrastructure/webserver/fastify')
const bootstrap = require('./infrastructure/bootstrap')

const container = bootstrap()
startHttp(container)
