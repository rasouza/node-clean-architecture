exports = module.exports = (container, User) => async id => await container.userRepository.get(id)

exports['@require'] = ['container', 'domain/User']
