'use strict'

const pick = require('lodash/fp/pick')

exports = module.exports = (errors, ListUsers, CreateUser, GetUser, UpdateUser, DeleteUser) => {
  return {
    async listUsers (req, res, next) {
      try {
        const users = await ListUsers()
        res.send(users)
      } catch (err) {
        next(err)
      }
    },

    async createUser (req, res, next) {
      const { name, cpf, birthdate, subscription, dependents } = req.body
      try {
        const user = await CreateUser(name, cpf, birthdate, subscription, dependents)
        res.send(201, user)
      } catch (err) {
        next(err)
      }
    },

    async findUser (req, res, next) {
      try {
        const user = await GetUser(req.params.id)
        res.send(user)
      } catch (err) {
        next(err)
      }
    },

    async updateUser (req, res, next) {
      try {
        const permitted = ['name', 'cpf', 'birthdate', 'subscription', 'dependents']
        const user = await UpdateUser(req.params.id, pick(permitted, req.body))
        res.send(user)
      } catch (err) {
        next(err)
      }
    },
    async deleteUser (req, res, next) {
      try {
        await DeleteUser(req.params.id)
        res.send(204, {})
      } catch (err) {
        next(err)
      }
    }
  }
}

exports['@require'] = [
  'restify-errors',
  'application/use_cases/ListUsers',
  'application/use_cases/CreateUser',
  'application/use_cases/GetUser',
  'application/use_cases/UpdateUser',
  'application/use_cases/DeleteUser'
]
