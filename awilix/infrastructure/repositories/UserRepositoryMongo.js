const { NotFoundError, ForbiddenError } = require('restify-errors')

module.exports = ({ User, UserSchema }) => ({
  find: async () => await UserSchema.find(),

  async persist (user) {
    const { name, cpf, birthdate, subscription, dependents } = user
    const mongooseUser = new UserSchema({
      name,
      cpf,
      birthdate,
      subscription,
      dependents
    })

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
      if (err.code === 11000) throw new ForbiddenError('This CPF already exists')
    }
  },

  async get (id) {
    try {
      const mongooseUser = await UserSchema.findById(id)
      if (!mongooseUser) throw new NotFoundError('User not found')

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
        throw new NotFoundError('User not found')
      } else {
        throw err
      }
    }
  },

  async merge (id, data) {
    try {
      const mongooseUser = await UserSchema.findByIdAndUpdate(id, data, { new: true })

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
        throw new NotFoundError('User not found')
      } else if (err.code === 11000) {
        throw new ForbiddenError('This CPF already exists')
      } else {
        throw err
      }
    }
  },

  async remove (id) {
    const mongooseUser = await UserSchema.findOneAndDelete({ _id: id })
    if (!mongooseUser) {
      throw new NotFoundError('User not found')
    }

    return mongooseUser
  }
})
