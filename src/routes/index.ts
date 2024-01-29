import { Express } from '../types'
import { getAdminRoutes } from './admin.route'
import express from 'express'
import { getUserRoutes } from './user.route'
import { getProductRoutes } from './product.route'
import { getReviewRoutes } from './review.route'
import { getOrderRoutes } from './order.route'

export const getRoutes = (app: Express) => {
  app.use('/admin', getAdminRoutes(express.Router()))
  app.use('/user', getUserRoutes(express.Router()))
  app.use('/product', getProductRoutes(express.Router()))
  app.use('/review', getReviewRoutes(express.Router()))
  app.use('/order', getOrderRoutes(express.Router()))
}
