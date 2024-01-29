import express from 'express'
import { getRoutes } from './routes'
import { Express } from './types'
import { config } from 'dotenv'
import { Logger } from './utils/logger.util'
import { ConnectDB } from './config/app.config'

import cors from 'cors'
if (process.env.NODE_ENV !== 'prod') {
  const data = config()
  if (data.error) {
    Logger.info('Unable to start server due to the environment issue')
    process.exit()
  }
  Logger.info('Environment variables parsed...')
}
const app: Express = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

;(async function () {
  await ConnectDB()
})()

getRoutes(app)

app.use('*', (request, response) => {
  return response.status(404).send({ message: 'Route not Found' })
})

export const App = app
