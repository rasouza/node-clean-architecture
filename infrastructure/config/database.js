const { asFunction } = require('awilix')

const inMemoryDB = container => {
  const UserRepositoryInMemory = require('../repositories/UserRepositoryInMemory')

  container.register({
    UserRepository: asFunction(UserRepositoryInMemory).singleton()
  })
}

const mongoDB = container => {
  const UserRepositoryMongo = require('../repositories/UserRepositoryMongo')

  // Load Database and Schemas
  container.loadModules([
    'infrastructure/database/**/*.js'
  ])

  container.register({
    UserRepository: asFunction(UserRepositoryMongo)
  })
}

const resolveDB = container => {
  if (process.env.NODE_ENV === 'test') process.env.DB_DRIVER = 'in-memory'

  if (process.env.DB_DRIVER === 'in-memory') inMemoryDB(container)
  else if (process.env.DB_DRIVER === 'mongo') mongoDB(container)
}

module.exports = resolveDB
