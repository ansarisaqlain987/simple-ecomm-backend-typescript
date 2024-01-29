import supertest from 'supertest'
const TEST_DB = 'mongodb://localhost:27017/hot-sellers-test'
process.env.DB_URL = TEST_DB
import { App } from '../../src/app'
import { AdminModel } from '../../src/models/admin.model'

describe('Admin Apis', () => {
  it('Create Admin', async () => {
    await AdminModel.collection.drop()
    const app = await App

    const res = await supertest(app).post('/admin').send({
      email: 'admin@test.com',
      password: '12345678',
      firstName: 'John',
      lastName: 'Cena',
    })
    expect(res.body).toMatchObject({
      data: {
        firstName: 'John',
        lastName: 'Cena',
        email: 'admin@test.com',
      },
      errors: null,
    })

    const loginResponse = await supertest(app).post('/admin/login').send({
      email: 'admin@test.com',
      password: '12345678',
    })
    expect(loginResponse?.body).toBeDefined()
    expect(loginResponse?.body?.data).toBeDefined()
    expect(loginResponse?.body?.data?.token).toBeDefined()
  })
})
