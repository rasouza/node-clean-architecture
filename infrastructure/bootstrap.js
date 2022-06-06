const container = require('./bootstrap/container')()
const registerLogger = require('./bootstrap/logger')
const registerDB = require('./bootstrap/database')

module.exports = () => {
  const { DB_DRIVER } = process.env
  // Logger
  registerLogger(container)

  // Database
  switch (DB_DRIVER) {
    case 'in-memory':
      registerDB.inMemory(container)
      break

    case 'mongo':
      registerDB.mongo(container)
      break
  }

  return container.cradle
}
