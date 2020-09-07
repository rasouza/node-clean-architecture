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
  }
]
