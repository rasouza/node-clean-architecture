const { NotFoundError, AlreadyExistsError } = require('../webserver/errors')

const MONGO_ALREADY_EXISTS = 11000

module.exports = ({ User, UserSchema }) => ({
  find: async () => await UserSchema.find(),

  persist: async user => {
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
      if (err.code === MONGO_ALREADY_EXISTS) {
        throw new AlreadyExistsError('This CPF already exists')
      }
    }
  },

  get: async id => {
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
  },

  merge: async (id, data) => {
    try {
      const user = await UserSchema
        .findByIdAndUpdate(id, data, { new: true })

      return new User(
        user.id,
        user.name,
        user.cpf,
        user.birthdate,
        user.subscription,
        user.dependents
      )
    } catch (err) {
      if (err.name === 'CastError') {
        throw new NotFoundError('User not found')
      } else if (err.code === MONGO_ALREADY_EXISTS) {
        throw new AlreadyExistsError('This CPF already exists')
      } else {
        throw err
      }
    }
  },

  remove: async (id) => {
    const mongooseUser = await UserSchema.findOneAndDelete({ _id: id })
    if (!mongooseUser) {
      throw new NotFoundError('User not found')
    }

    return mongooseUser
  }
})
