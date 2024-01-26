import mongoose from 'mongoose'
import { Logger } from '../utils/logger.util'

export const JWT_SECRET = process.env.JWT_SECRET ?? 'jwt_secret'
export const SECRET = process.env.SECRET ?? 'secret'
export const DB_URL =
  process.env.DB_URL ?? 'mongodb://localhost:27017/hot-sellers'
export const PORT = process.env.PORT ?? 8000

export const ConnectDB = async () => {
  try {
    await mongoose.connect(DB_URL)
  } catch (err) {
    Logger.info('Unable to connect to DB')
    process.exit(0)
  }
}
