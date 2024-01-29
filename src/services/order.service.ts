import { OrderModel } from '../models/order.model'

export const createOrder = async (
  userId: string,
  items: unknown[],
  total: number,
) => {
  const order = await OrderModel.create({
    user: userId,
    items: items,
    total: total,
    orderDate: Date.now(),
  })
  order.save()
  return order
}

export const getOrderDetailsById = (id: string) => {
  return OrderModel.findById(id)
}

export const getOrdersByFilters = (filter: object = {}) => {
  return OrderModel.find(filter)
}
