require('dotenv').config()

const IoC = require('electrolyte')

IoC.use(IoC.node_modules())
IoC.use('schemas', IoC.dir('infrastructure/database/schemas'))
IoC.use(IoC.dir('infrastructure/config'))
IoC.use(IoC.dir('.'))

const app = async () => {
  const bootstrap = await IoC.create('bootstrap')
  bootstrap.init()
  bootstrap.registerProviders()

  return bootstrap.createServer()
}

module.exports = app()
