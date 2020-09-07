const { RESOLVER, Lifetime } = require('awilix')
const mongoose = require('mongoose')

const database = () => {
  const { DB_HOST, DB_PORT, DB_DATABASE, DB_USER, DB_PASS } = process.env
  const connectionString = `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`

  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    user: DB_USER,
    pass: DB_PASS
  })

  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', () => {
    console.log('connected to MongoDB database!')
  })

  return mongoose
}

module.exports = database
database[RESOLVER] = {
  name: 'database',
  lifetime: Lifetime.SINGLETON
}
