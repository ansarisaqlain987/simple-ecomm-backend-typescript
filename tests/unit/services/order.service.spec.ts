import mongoose from 'mongoose'
import {
  createOrder,
  getOrderDetailsById,
  getOrdersByFilters,
} from '../../../src/services/order.service'
import { connectDbForTesting } from '../../loadTest.util'
import { OrderModel } from '../../../src/models/order.model'

describe('Order Service', () => {
  beforeAll(async () => {
    await connectDbForTesting()
  })

  it('Order Service : Unit Test', async () => {
    const userId = new mongoose.Types.ObjectId().toString()

    // create order
    const createOrderResponse = await createOrder(userId, [], 23)
    expect(createOrderResponse?.user).toBe(userId)
    expect(createOrderResponse?.items).toBeInstanceOf(Array)
    expect(createOrderResponse?.total).toBe(23)

    const getOrderResponse = await getOrderDetailsById(
      createOrderResponse?._id?.toString(),
    )
    expect(getOrderResponse?.user).toBe(userId)
    expect(getOrderResponse?.items).toBeInstanceOf(Array)
    expect(getOrderResponse?.total).toBe(23)

    const getOrdersByFiltersResponse = await getOrdersByFilters()
    expect(getOrdersByFiltersResponse).toBeTruthy()
  })

  afterAll(async () => {
    await OrderModel.collection.drop()
  })
})
