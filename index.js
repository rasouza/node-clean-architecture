require('dotenv').config()
require('make-promises-safe')

const container = require('./infrastructure/config/container')()
const server = require('./infrastructure/webserver/fastify')

module.exports = server(container.cradle)
