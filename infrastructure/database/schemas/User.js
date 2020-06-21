'use strict'

exports = module.exports = ({ database: mongoose }) => mongoose.model('User', new mongoose.Schema({
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
}))

exports['@singleton'] = true
exports['@require'] = ['container']
