import express from 'express'
import { getRoutes } from './routes'
import { Express } from './types'
import { config } from 'dotenv'
import { Logger } from './utils/logger.util'
import { ConnectDB } from './config/app.config'

const data = config()
if (data.error) {
  Logger.info('Unable to start server due to the environment issue')
  process.exit()
}
Logger.info('Environment variables parsed...')
const app: Express = express()
;(async () => await ConnectDB())()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

getRoutes(app)

app.use('*', (request, response) => {
  return response.status(404).send({ message: 'Route not Found' })
})

export const App = app
