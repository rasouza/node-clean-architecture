const { createContainer } = require('awilix')

const container = createContainer()

module.exports = () => {
  container.loadModules([
    'ports/**/*.js',
    'application/**/*.js',
    'domain/**/*.js'
  ])

  return container
}
