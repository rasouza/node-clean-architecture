exports = module.exports = (container) => async () => {
  return await container.userRepository.find()
}

exports['@require'] = ['container']
