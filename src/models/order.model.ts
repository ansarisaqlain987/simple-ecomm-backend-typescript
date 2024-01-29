import { Schema, model } from 'mongoose'
import { IOrder } from '../types'
import { ProductSchema } from './products.model'

const orderSchema = new Schema<IOrder>(
  {
    user: { type: String, required: true, ref: 'User' },
    items: [
      {
        product: { type: ProductSchema, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    total: { type: Number, required: true },
    orderDate: { type: String, required: true },
  },
  {
    timestamps: true,
  },
)

export const OrderModel = model('Order', orderSchema, 'orders')
