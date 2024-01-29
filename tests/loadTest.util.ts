import mongoose from 'mongoose'
import { Logger } from '../src/utils/logger.util'
// import { AdminModel } from '../src/models/admin.model'
import { UserModel } from '../src/models/user.model'
import { ProductModel } from '../src/models/products.model'
import { ReviewModel } from '../src/models/review.model'
import { OrderModel } from '../src/models/order.model'

const TEST_DB = 'mongodb://localhost:27017/hot-sellers-test'

export const connectDbForTesting = async () => {
  try {
    await mongoose.connect(TEST_DB)
    console.log('Test DB connected', TEST_DB)
  } catch (err) {
    Logger.info('Unable to connect to DB')
    process.exit(0)
  }
}

export const disconnectDbForTesting = async () => {
  try {
    await mongoose.connection.close()
  } catch (err) {
    Logger.info('Unable to connect to DB')
    process.exit(0)
  }
}

export const dropAllCollections = async () => {
  // await AdminModel.collection.drop()
  await UserModel.collection.drop()
  await ProductModel.collection.drop()
  await ReviewModel.collection.drop()
  await OrderModel.collection.drop()
}

export const describeTest = (dsc: string, fn: () => void) => {
  describe(dsc, () => {
    beforeAll(async () => {
      await connectDbForTesting()
    })

    fn()
    afterAll(async () => {
      await dropAllCollections()
      await disconnectDbForTesting()
    })
  })
}
