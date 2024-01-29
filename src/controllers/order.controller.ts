import {
  createOrder,
  getOrderDetailsById,
  getOrdersByFilters,
} from '../services/order.service'
import { getProductByIds } from '../services/product.service'
import { Controller, Request, Response } from '../types'
import { Logger } from '../utils/logger.util'
import { getErrorResponse } from '../utils/response.util'

type InputPlaceOrder = Array<{ productId: string; quantity: number }>
export const placeOrder: Controller = async (
  request: Request<InputPlaceOrder>,
  response: Response,
) => {
  try {
    const { id = '' } = request.user ?? {}
    const items = request.body
    const ids = items?.map(item => item.productId)
    const products = await getProductByIds(ids)
    if (products.length !== items.length) {
      return response.status(200).send({
        data: null,
        errors: ['Product does not exist'],
      })
    }
    let orderTotal = 0
    const orderItems = products.map((p, index) => {
      const q = items[index]?.quantity
      orderTotal = orderTotal + q * p.price
      return {
        product: p,
        price: p.price,
        quantity: q,
      }
    })

    const order = await createOrder(id, orderItems, orderTotal)
    return response.status(201).send({
      data: order,
      errors: null,
    })
  } catch (err) {
    Logger.error(err)
    return getErrorResponse(response, err)
  }
}

export const getOrderDetails: Controller = async (
  request: Request<object, { id: string }>,
  response: Response,
) => {
  try {
    const { id } = request.params
    const record = await getOrderDetailsById(id)

    return response.status(record ? 200 : 204).send({
      data: record,
      errors: null,
    })
  } catch (err) {
    Logger.error(err)
    return getErrorResponse(response, err)
  }
}

export const getMyOrders: Controller = async (
  request: Request,
  response: Response,
) => {
  try {
    const { id = '' } = request.user ?? {}
    const records = await getOrdersByFilters({ user: id })

    return response.status(records.length > 0 ? 200 : 204).send({
      data: records,
      errors: null,
    })
  } catch (err) {
    Logger.error(err)
    return getErrorResponse(response, err)
  }
}

export const listOrders: Controller = async (
  request: Request,
  response: Response,
) => {
  try {
    const records = await getOrdersByFilters()

    return response.status(records.length > 0 ? 200 : 204).send({
      data: records,
      errors: null,
    })
  } catch (err) {
    Logger.error(err)
    return getErrorResponse(response, err)
  }
}
