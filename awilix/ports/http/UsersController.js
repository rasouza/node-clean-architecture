module.exports = ({ ListUsers, CreateUser, GetUser }) => ({
  async listUsers (req, res, next) {
    try {
      const users = await ListUsers()
      res.send(users)
    } catch (err) {
      next(err)
    }
  },

  async createUser (req, res, next) {
    const { name, cpf, birthdate, subscription, dependents } = req.body
    try {
      const user = await CreateUser(name, cpf, birthdate, subscription, dependents)
      res.send(201, user)
    } catch (err) {
      next(err)
    }
  },

  async findUser (req, res, next) {
    try {
      const user = await GetUser(req.params.id)
      res.send(user)
    } catch (err) {
      next(err)
    }
  }
})
