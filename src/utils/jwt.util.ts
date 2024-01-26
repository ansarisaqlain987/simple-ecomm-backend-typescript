import jwt from 'jsonwebtoken'
import { AES, enc } from 'crypto-ts'

export const encrypt = (data: string, key: string): string => {
  return AES.encrypt(data, key).toString()
}

export const decrypt = (cipher: string, key: string): string => {
  return AES.decrypt(cipher, key).toString(enc.Utf8)
}

export const createToken = (data: string, key: string): string => {
  return jwt.sign(data, key)
}

export const verifyToken = (token: string, key: string): string => {
  return jwt.verify(token, key) as string
}
