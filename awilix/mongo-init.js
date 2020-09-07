db.createUser({
  user: 'myuser',
  pwd: 'mypass',
  roles: [
    {
      role: 'readWrite',
      db: 'users'
    }
  ]
})
