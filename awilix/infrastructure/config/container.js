const { createContainer, asFunction } = require('awilix')

const container = createContainer()

const resolveDB = ({ DB_DRIVER, NODE_ENV }) => {
  if (NODE_ENV === 'test') DB_DRIVER = 'in-memory'

  if (DB_DRIVER === 'in-memory') inMemoryDB()
  else if (DB_DRIVER === 'mongo') mongoDB()
}

const inMemoryDB = () => {
  const UserRepositoryInMemory = require('../repositories/UserRepositoryInMemory')

  container.register({
    UserRepository: asFunction(UserRepositoryInMemory)
  })
}

const mongoDB = () => {
  const UserRepositoryMongo = require('../repositories/UserRepositoryMongo')

  // Load Database and Schemas
  container.loadModules([
    'infrastructure/database/**/*.js'
  ])

  container.register({
    UserRepository: asFunction(UserRepositoryMongo)
  })
}

module.exports = () => {
  container.loadModules([
    'ports/**/*.js',
    'application/**/*.js',
    'domain/**/*.js'
  ])

  resolveDB(process.env)

  return container
}
