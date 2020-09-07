module.exports = ({ UsersController }) => [
  {
    method: 'get',
    path: '/users',
    handler: UsersController.listUsers
  }
]
