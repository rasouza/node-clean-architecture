const { RESOLVER } = require('awilix')
const { Schema } = require('mongoose')

const userSchema = new Schema({
  name: String,
  cpf: {
    type: Number,
    index: true,
    unique: true
  },
  birthdate: Date,
  subscription: {
    type: String,
    enum: ['Basic', 'Standard', 'Premium']
  },
  dependents: Number
})

const userModel = ({ database: mongoose }) => mongoose.model('User', userSchema)
module.exports = userModel

userModel[RESOLVER] = {
  name: 'UserSchema'
}
