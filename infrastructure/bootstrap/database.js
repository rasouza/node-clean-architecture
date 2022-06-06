const { asValue } = require('awilix')
const connectMongoDB = require('../database/mongo')

module.exports = {
  inMemory (container) {
    container.loadModules([
      'infrastructure/repositories/*InMemory.js'
    ])
  },

  mongo (container) {
    const mongoose = connectMongoDB()

    container.register({
      database: asValue(mongoose)
    })

    container.loadModules([
      'infrastructure/database/schemas/*.js',
      'infrastructure/repositories/*Mongo.js'
    ])
  }
}
