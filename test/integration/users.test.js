const { expect } = require('chai')

process.env.NODE_ENV = 'test'

/**
 * FIXME: supertest doesn't work with fastify
 */

describe('Users API', async () => {
  const server = await require('../../index')
  console.log(server)
  const request = require('supertest')(server)
  describe('When there is no user in database', () => {
    it('GET /users returns empty list', async () => {
      await request
        .get('/users')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect([])
        .expect(200)
    })
  })

  describe('When a valid user is inserted', () => {
    it('POST /users returns a successful response', async () => {
      const user = {
        name: 'Rodrigo'
      }
      await request
        .post('/users')
        .set('Accept', 'application/json')
        .send(user)
        .expect({ id: '1', name: 'Rodrigo' })
        .expect(201)
    })

    it('GET /users returns a list with 1 user', async () => {
      await request
        .get('/users')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(res => {
          expect(res.body).to.have.lengthOf(1)
        })
        .expect(200)
    })

    describe('but a CPF already exists', () => {
      it('POST /users returns 403', async () => {
        const user = {
          name: 'Rodrigo'
        }
        await request
          .post('/users')
          .set('Accept', 'application/json')
          .send(user)
          .expect(403)
      })
    })
  })

  describe('When there are users in database', () => {
    describe('GET /users/:id', () => {
      it('returns 404 when an user not exists', async () => {
        await request
          .get('/users/0')
          .set('Accept', 'application/json')
          .expect(404)
      })
      it('returns 200 when an user exists', async () => {
        await request
          .get('/users/1')
          .set('Accept', 'application/json')
          .expect({ id: '1', name: 'Rodrigo' })
          .expect(200)
      })
    })
    describe('PATCH /users/:id', () => {
      it('returns 404 when an user not exists', async () => {
        await request
          .patch('/users/0')
          .set('Accept', 'application/json')
          .send({
            subscription: 'Basic'
          })
          .expect(404)
      })
      it('returns 200 when an uupdate went successful', async () => {
        await request
          .patch('/users/1')
          .set('Accept', 'application/json')
          .send({
            subscription: 'Basic',
            name: 'Laura'
          })
          .expect({ id: '1', name: 'Laura', subscription: 'Basic' })
          .expect(200)
      })
    })
    describe('DELETE /users/:id ', () => {
      it('return 404 when user not exists', async () => {
        await request
          .delete('/users/0')
          .set('Accept', 'application/json')
          .expect(404)
      })
      it('return 204 when succesfully deleting user', async () => {
        await request
          .delete('/users/1')
          .set('Accept', 'application/json')
          .expect(204)
      })
    })
  })
})
