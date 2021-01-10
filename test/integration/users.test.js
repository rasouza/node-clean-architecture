const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)
const expect = chai.expect

describe('Users API', async () => {
  describe('When there is no user in database', () => {
    it('GET /users returns empty list', async () => {
      await chai.request('http://localhost:3000')
        .get('/users')
        .then(res => {
          expect(res).to.be.json
          expect(res).to.have.status(200)
          expect(res.body).to.be.empty
        })
    })
  })

  describe('When a valid user is inserted', () => {
    it('POST /users returns a successful response', async () => {
      const user = {
        name: 'Rodrigo'
      }

      await chai.request('http://localhost:3000')
        .post('/users')
        .send(user)
        .then(res => {
          expect(res).to.have.status(201)
          expect(res.body).to.eql({ id: '1', name: 'Rodrigo' })
        })
    })

    it('GET /users returns a list with 1 user', async () => {
      await chai.request('http://localhost:3000')
        .get('/users')
        .then(res => {
          expect(res)
          expect(res).to.be.json
          expect(res).to.have.status(200)
          expect(res.body).to.have.lengthOf(1)
        })
    })

    describe('but a CPF already exists', () => {
      it('POST /users returns 409 Conflict', async () => {
        const user = {
          name: 'Rodrigo'
        }
        await chai.request('http://localhost:3000')
          .post('/users')
          .send(user)
          .catch(err => {
            expect(err).to.have.status(409)
          })
      })
    })
  })

  describe('When there are users in database', () => {
    describe('GET /users/:id', () => {
      it('returns 404 when an user not exists', async () => {
        await chai.request('http://localhost:3000')
          .get('/users/0')
          .catch(err => {
            expect(err).to.be.json
            expect(err).to.have.status(404)
          })
      })
      it('returns 200 when an user exists', async () => {
        await chai.request('http://localhost:3000')
          .get('/users/1')
          .then(res => {
            expect(res).to.be.json
            expect(res).to.have.status(200)
            expect(res.body).to.eql({ id: '1', name: 'Rodrigo' })
          })
      })
    })
    describe('PATCH /users/:id', () => {
      it('returns 404 when an user not exists', async () => {
        await chai.request('http://localhost:3000')
          .patch('/users/0')
          .send({
            subscription: 'Basic'
          })
          .catch(err => {
            expect(err).to.be.json
            expect(err).to.have.status(404)
          })
      })
      it('returns 200 when an update went successful', async () => {
        await chai.request('http://localhost:3000')
          .patch('/users/1')
          .send({
            subscription: 'Basic',
            name: 'Laura'
          })
          .then(res => {
            expect(res).to.be.json
            expect(res).to.have.status(200)
            expect(res.body).to.eql({ id: '1', name: 'Laura', subscription: 'Basic' })
          })
      })
    })
    describe('DELETE /users/:id ', () => {
      it('return 404 when user not exists', async () => {
        await chai.request('http://localhost:3000')
          .delete('/users/0')
          .catch(err => {
            expect(err).to.have.status(404)
          })
      })
      it('return 204 when succesfully deleting user', async () => {
        await chai.request('http://localhost:3000')
          .delete('/users/1')
          .then(res => {
            expect(res).to.have.status(200)
          })
      })
    })
  })
})
