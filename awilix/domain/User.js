module.exports = () => class {
  constructor (id = null, name, cpf, birthdate, subscription, dependents) {
    this.id = id
    this.name = name
    this.cpf = cpf
    this.birthdate = birthdate
    this.subscription = subscription
    this.dependents = dependents
  }
}
