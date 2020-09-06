'use strict'

exports = module.exports = (restify, UsersController) => [
  {
    method: 'get',
    path: '/users',
    handler: UsersController.listUsers
  },
  {
    method: 'post',
    path: '/users',
    handler: UsersController.createUser
  },
  {
    method: 'get',
    path: '/users/:id',
    handler: UsersController.findUser
  },
  {
    method: 'patch',
    path: '/users/:id',
    handler: UsersController.updateUser
  },
  {
    method: 'put',
    path: '/users/:id',
    handler: UsersController.updateUser
  },
  {
    method: 'del',
    path: '/users/:id',
    handler: UsersController.deleteUser
  },
  {
    method: 'get',
    path: '/docs/*',
    handler: restify.plugins.serveStatic({
      directory: `${__dirname}../../../`,
      default: 'index.html'
    })
  },
  {
    method: 'get',
    path: '/coverage/*',
    handler: restify.plugins.serveStatic({
      directory: `${__dirname}../../../`,
      default: 'index.html'
    })
  }
]

exports['@singleton'] = true
exports['@require'] = ['restify', 'ports/http/UsersController']
