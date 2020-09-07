const pick = require('lodash/fp/pick')

const UsersController = (container) => ({
  listUsers: async (req, res, next) => {
    const { ListUsers } = container

    try {
      const users = await ListUsers()
      res.send(users)
    } catch (err) {
      next(err)
    }
  },

  createUser: async (req, res, next) => {
    const { CreateUser } = container
    const { name, cpf, birthdate, subscription, dependents } = req.body

    try {
      const user = await CreateUser(
        name,
        cpf,
        birthdate,
        subscription,
        dependents
      )

      res.send(201, user)
    } catch (err) {
      next(err)
    }
  },

  findUser: async (req, res, next) => {
    const { GetUser } = container

    try {
      const user = await GetUser(req.params.id)
      res.send(user)
    } catch (err) {
      next(err)
    }
  },

  deleteUser: async (req, res, next) => {
    const { DeleteUser } = container

    try {
      await DeleteUser(req.params.id)
      res.send(204, {})
    } catch (err) {
      next(err)
    }
  },

  updateUser: async (req, res, next) => {
    const { UpdateUser } = container

    try {
      const permitted = [
        'name',
        'cpf',
        'birthdate',
        'subscription',
        'dependents'
      ]

      const user = await UpdateUser(req.params.id, pick(permitted, req.body))
      res.send(user)
    } catch (err) {
      next(err)
    }
  }
})

module.exports = UsersController
