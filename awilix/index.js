require('dotenv').config()

const container = require('./infrastructure/config/container')()
const server = require('./infrastructure/webserver/server')

console.log(container.cradle.UserSchema)
server(container.cradle)
