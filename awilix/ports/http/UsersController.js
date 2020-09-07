module.exports = ({ ListUsers }) => ({
  listUsers (req, res, next) {
    try {
      const users = ListUsers()
      res.send(users)
    } catch (err) {
      next(err)
    }
  }
})
