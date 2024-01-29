import {
  connectDbForTesting,
  disconnectDbForTesting,
  // dropAllCollections,
} from '../../loadTest.util'
// import faker from "@faker-js/faker";
import {
  createAdmin,
  getAdminByEmail,
  updateAdminDetails,
} from '../../../src/services/admin.service'
import { AdminModel } from '../../../src/models/admin.model'
describe('Admin Service', () => {
  beforeAll(async () => {
    await connectDbForTesting()
  })

  it('Admin Service: Unit Tests ', async () => {
    // createAdmin
    const admin = {
      email: 'admin@test.com',
      password: '12345678',
      firstName: 'John',
      lastName: 'Cena',
    }
    const response = await createAdmin(admin)
    expect(response?.email).toBe(admin?.email)
    expect(response?.firstName).toBe(admin?.firstName?.toLocaleLowerCase())
    expect(response?.lastName).toBe(admin?.lastName?.toLocaleLowerCase())
    expect(response?.id).toBeDefined()

    // updateAdminDetails
    const updateResponse = await updateAdminDetails(response?.id, {
      firstName: 'test',
    })
    expect(updateResponse.firstName).toBe('test')

    // getAdminByEmail
    let getResponse = await getAdminByEmail(admin?.email)
    expect(getResponse?.firstName).toBe('test')
    expect(response?.email).toBe(admin?.email)
    expect(response?.lastName).toBe(admin?.lastName?.toLocaleLowerCase())

    getResponse = await getAdminByEmail(admin?.email, { email: 0 })
    expect(getResponse?.email).toBeFalsy()
  })

  afterAll(async () => {
    await AdminModel.collection.drop()
    await disconnectDbForTesting()
  })
})
