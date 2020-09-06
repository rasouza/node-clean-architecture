exports = module.exports = (container, User) => async (name, cpf, birthdate, subscription, dependents) => {
  const user = await new User(null, name, cpf, birthdate, subscription, dependents)
  return await container.userRepository.persist(user)
}

exports['@require'] = ['container', 'domain/User']
