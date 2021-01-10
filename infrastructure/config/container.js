const { createContainer } = require('awilix')
const resolveLogger = require('./logger')
const resolveDB = require('./database')

const container = createContainer()

module.exports = () => {
  container.loadModules([
    'ports/**/*.js',
    'application/**/*.js',
    'domain/**/*.js'
  ])

  resolveDB(container)
  resolveLogger(container)

  return container
}
