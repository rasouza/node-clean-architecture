'use strict'

exports = module.exports = (User, MongooseUser, errors) => {
  return {
    async find () {
      return MongooseUser.find()
    },
    async persist (user) {
      const { name, cpf, birthdate, subscription, dependents } = user
      const mongooseUser = new MongooseUser({ name, cpf, birthdate, subscription, dependents })
      try {
        await mongooseUser.save()
        return new User(
          mongooseUser.id,
          mongooseUser.name,
          mongooseUser.cpf,
          mongooseUser.birthdate,
          mongooseUser.subscription,
          mongooseUser.dependents
        )
      } catch (err) {
        if (err.code === 11000) { throw new errors.AlreadyExists('This CPF already exists') }
      }
    },
    async get (id) {
      try {
        const mongooseUser = await MongooseUser.findById(id)
        if (!mongooseUser) { throw new errors.NotFound('User not found') }

        return new User(
          mongooseUser.id,
          mongooseUser.name,
          mongooseUser.cpf,
          mongooseUser.birthdate,
          mongooseUser.subscription,
          mongooseUser.dependents
        )
      } catch (err) {
        if (err.name === 'CastError') {
          throw new errors.NotFound('User not found')
        } else {
          throw err
        }
      }
    },
    async merge (id, data) {
      try {
        const mongooseUser = await MongooseUser.findByIdAndUpdate(id, data, { new: true })

        return new User(
          mongooseUser.id,
          mongooseUser.name,
          mongooseUser.cpf,
          mongooseUser.birthdate,
          mongooseUser.subscription,
          mongooseUser.dependents
        )
      } catch (err) {
        if (err.name === 'CastError') {
          throw new errors.NotFound('User not found')
        } else if (err.code === 11000) {
          throw new errors.AlreadyExists('This CPF already exists')
        } else {
          throw err
        }
      }
    },

    async remove (id) {
      const mongooseUser = await MongooseUser.findOneAndDelete({ _id: id })
      if (!mongooseUser) {
        throw new errors.NotFound('User not found')
      }

      return mongooseUser
    }
  }
}

exports['@require'] = ['domain/User', 'schemas/User', 'ports/http/errors']
