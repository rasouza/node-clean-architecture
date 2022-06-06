const startHttp = require('../../infrastructure/webserver/fastify')
const bootstrap = require('../../infrastructure/bootstrap')

const container = bootstrap()
const app = startHttp(container)

afterEach(() => {
  const { UserRepository } = container
  UserRepository.db = []
})

describe('Users API', () => {
  describe('When there is no user in database', () => {
    describe('GET /users', () => {
      it('returns empty list', async () => {
        const res = await app.inject()
          .get('/users')
        const body = res.json()

        expect(res.statusCode).toBe(200)
        expect(body).toMatchObject([])
        expect(body).toHaveLength(0)
      })
    })

    describe('POST /users', () => {
      it('returns a successful response', async () => {
        const user = {
          name: 'fake user',
          cpf: '111'
        }

        const res = await app.inject()
          .post('/users')
          .payload(user)

        expect(res.statusCode).toBe(201)
        expect(res.json()).toEqual({ id: '1', name: 'fake user', cpf: '111' })
      })
    })
  })

  describe('When a valid user already exists', () => {
    beforeEach(() => {
      const { UserRepository } = container

      const user = {
        name: 'fake user',
        cpf: '111',
        id: '1'
      }

      UserRepository.persist(user)
    })

    describe('GET /users', () => {
      it('returns a list with 1 user', async () => {
        const res = await app.inject()
          .get('/users')

        expect(res.statusCode).toBe(200)
        expect(res.json()).toHaveLength(1)
      })
    })
    describe('POST /users', () => {
      it('returns 409 Conflict when inserting the same CPF', async () => {
        const user = {
          name: 'another fake user',
          cpf: '111'
        }
        const res = await app.inject()
          .post('/users')
          .payload(user)

        expect(res.statusCode).toBe(409)
      })
    })

    describe('GET /users/:id', () => {
      it('returns 404 when an user not exists', async () => {
        const res = await app.inject()
          .get('/users/0')

        expect(res.statusCode).toBe(404)
      })
      it('returns 200 when an user exists', async () => {
        const res = await app.inject()
          .get('/users')

        expect(res.statusCode).toBe(200)
        expect(res.json()).toMatchObject([{ name: 'fake user' }])
      })
    })

    describe('PATCH /users/:id', () => {
      it('returns 404 when an user not exists', async () => {
        const res = await app.inject()
          .patch('/users/0')
          .payload({
            subscription: 'Basic'
          })

        expect(res.statusCode).toBe(404)
      })
      it('returns 200 when an update went successful', async () => {
        const user = {
          name: 'fake user',
          cpf: '222'
        }

        const { id } = (await app.inject()
          .post('/users')
          .payload(user))
          .json()

        const res = await app.inject()
          .patch(`/users/${id}`)
          .payload({
            subscription: 'Basic',
            name: 'Laura'
          })

        expect(res.statusCode).toBe(200)
        expect(res.json()).toMatchObject({ id, name: 'Laura', subscription: 'Basic' })
      })
    })

    describe('DELETE /users/:id ', () => {
      it('return 404 when user not exists', async () => {
        const res = await app.inject()
          .delete('/users/0')

        expect(res.statusCode).toBe(404)
      })
      it('return 204 when succesfully deleting user', async () => {
        const user = {
          name: 'fake user',
          cpf: '222'
        }

        const { id } = (await app.inject()
          .post('/users')
          .payload(user))
          .json()

        const res = await app.inject()
          .delete(`/users/${id}`)

        expect(res.statusCode).toBe(200)
      })
    })
  })
})
