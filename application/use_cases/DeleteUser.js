'use strict'

exports = module.exports = container => async id => {
  return await container.userRepository.remove(id)
}

exports['@require'] = ['container']
