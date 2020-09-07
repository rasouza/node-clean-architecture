module.exports = ({ UserRepository, User }) =>
  (name, cpf, birthdate, subscription, dependents) => {
    const user = new User(null, name, cpf, birthdate, subscription, dependents)
    return UserRepository.persist(user)
  }
