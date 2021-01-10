module.exports = ({ UsersController }) => [
  {
    method: 'GET',
    path: '/users',
    handler: UsersController.listUsers
  },
  {
    method: 'POST',
    path: '/users',
    handler: UsersController.createUser
  },
  {
    method: 'GET',
    path: '/users/:id',
    handler: UsersController.findUser
  },
  {
    method: 'DELETE',
    path: '/users/:id',
    handler: UsersController.deleteUser
  },
  {
    method: 'PATCH',
    path: '/users/:id',
    handler: UsersController.updateUser
  },
  {
    method: 'PUT',
    path: '/users/:id',
    handler: UsersController.updateUser
  }
]
