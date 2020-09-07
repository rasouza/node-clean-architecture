require('dotenv').config()

const container = require('./infrastructure/config/container')()
const server = require('./infrastructure/webserver/server')

server(container.cradle)
