const pick = require('lodash/fp/pick')

const UsersController = (container) => ({
  listUsers: async (req, res) => {
    const { ListUsers } = container

    const users = await ListUsers()
    return users
  },

  createUser: async (req, res) => {
    const { CreateUser } = container
    const { name, cpf, birthdate, subscription, dependents } = req.body

    const user = await CreateUser(
      name,
      cpf,
      birthdate,
      subscription,
      dependents
    )

    res.code(201).send(user)
  },

  findUser: async (req, res) => {
    const { GetUser } = container

    const user = await GetUser(req.params.id)
    return user
  },

  deleteUser: async (req, res) => {
    const { DeleteUser } = container

    const user = await DeleteUser(req.params.id)
    return user
  },

  updateUser: async (req, res) => {
    const { UpdateUser } = container

    const permitted = [
      'name',
      'cpf',
      'birthdate',
      'subscription',
      'dependents'
    ]

    const user = await UpdateUser(req.params.id, pick(permitted, req.body))
    return user
  }
})

module.exports = UsersController
