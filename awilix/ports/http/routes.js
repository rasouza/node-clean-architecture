const restify = require('restify')

module.exports = ({ UsersController }) => [
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
    method: 'del',
    path: '/users/:id',
    handler: UsersController.deleteUser
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
