require('dotenv').config()

const container = require('./infrastructure/config/container')()
const server = require('./infrastructure/webserver/server')

module.exports = server(container.cradle)
