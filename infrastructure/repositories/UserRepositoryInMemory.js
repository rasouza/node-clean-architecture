const filter = require('lodash/fp/filter')
const first = require('lodash/fp/first')
const remove = require('lodash/fp/remove')
const merge = require('lodash/fp/merge')

const { NotFoundError, AlreadyExistsError } = require('../webserver/errors')

module.exports = () => {
  return {
    lastId: 0,
    db: [],
    find () {
      return this.db
    },

    persist (user) {
      const duplicated = filter({ cpf: user.cpf }, this.db)
      if (duplicated.length > 0) throw new AlreadyExistsError('This CPF already exists')

      user.id = `${++this.lastId}`
      this.db.push(user)
      return user
    },

    get (id) {
      const user = first(filter({ id }, this.db))
      if (!user) throw new NotFoundError('User not found')
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
