module.exports = ({ ListUsers, CreateUser, GetUser, DeleteUser }) => ({
  listUsers: async (req, res, next) => {
    try {
      const users = await ListUsers()
      res.send(users)
    } catch (err) {
      next(err)
    }
  },

  createUser: async (req, res, next) => {
    const { name, cpf, birthdate, subscription, dependents } = req.body
    try {
      const user = await CreateUser(name, cpf, birthdate, subscription, dependents)
      res.send(201, user)
    } catch (err) {
      next(err)
    }
  },

  findUser: async (req, res, next) => {
    try {
      const user = await GetUser(req.params.id)
      res.send(user)
    } catch (err) {
      next(err)
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      await DeleteUser(req.params.id)
      res.send(204, {})
    } catch (err) {
      next(err)
    }
  }
})
