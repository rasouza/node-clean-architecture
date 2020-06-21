'use strict'

exports = module.exports = (container) => async (id, data) => {
  return await container.userRepository.merge(id, data)
}

exports['@require'] = ['container']
