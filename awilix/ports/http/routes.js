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
  }
]
