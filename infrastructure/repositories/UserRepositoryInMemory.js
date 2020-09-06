const filter = require('lodash/fp/filter')
const first = require('lodash/fp/first')
const remove = require('lodash/fp/remove')
const merge = require('lodash/fp/merge')

exports = module.exports = (User, errors) => {
  return {
    lastId: 0,
    db: [],
    find () {
      return this.db
    },

    persist (user) {
      const duplicated = filter({ cpf: user.cpf }, this.db)
      if (duplicated.length > 0) throw new errors.AlreadyExists('This CPF already exists')

      user.id = `${++this.lastId}`
      this.db.push(user)
      return user
    },

    get (id) {
      const user = first(filter({ id }, this.db))
      if (!user) throw new errors.NotFound('User not found')
      return user
    },

    merge (id, data) {
      let user = this.remove(id)
      user = merge(user, data)

      this.db.push(user)
      return user
    },

    remove (id) {
      const user = this.get(id)
      this.db = remove({ id }, this.db)

      return user
    }
  }
}

exports['@require'] = ['domain/User', 'ports/http/errors']
