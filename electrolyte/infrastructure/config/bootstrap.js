exports = module.exports = IoC => {
  return {
    async init () {
      // put your initializers here...
    },

    async registerProviders () {
      const container = await IoC.create('container')

      if (process.env.NODE_ENV === 'test') { process.env.DB_DRIVER = 'in-memory' }

      if (process.env.DB_DRIVER === 'in-memory') {
        container.database = 'in-memory'
        container.userRepository = await IoC.create(
          'infrastructure/repositories/UserRepositoryInMemory'
        )
      } else if (process.env.DB_DRIVER === 'mongo') {
        container.database = await IoC.create('infrastructure/database/mongo')
        container.userRepository = await IoC.create(
          'infrastructure/repositories/UserRepositoryMongo'
        )
      }
    },

    async createServer () {
      const server = await IoC.create('infrastructure/webserver/server')

      server.listen(8080, () => {
        console.log(`${server.name} listening at ${server.url}`)
      })

      return server
    }
  }
}

exports['@singleton'] = true
exports['@require'] = ['electrolyte']
