const { asValue } = require('awilix')

const resolveLogger = container => {
  const isDev = process.env.NODE_ENV === 'development'
  const config = {
    name: 'app',
    prettyPrint: isDev,
    level: process.env.LOG_LEVEL || 'info'
  }

  const Logger = require('pino')(config)

  container.register({
    Logger: asValue(Logger)
  })

  container.register({
    LoggerConfig: asValue(config)
  })
}

module.exports = resolveLogger
