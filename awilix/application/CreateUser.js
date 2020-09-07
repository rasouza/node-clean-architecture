module.exports = ({ UserRepository, User }) =>
  async (name, cpf, birthdate, subscription, dependents) => {
    const user = await new User(null, name, cpf, birthdate, subscription, dependents)
    return await UserRepository.persist(user)
  }
