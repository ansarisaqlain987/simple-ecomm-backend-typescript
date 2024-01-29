import { JWT_SECRET, SECRET } from '../config/app.config'
import {
  AllowedUsers,
  ITokenData,
  NextFunction,
  Request,
  Response,
} from '../types'
import { decrypt, verifyToken } from '../utils/jwt.util'
import { Logger } from '../utils/logger.util'

export const authenticateRequest = (userType?: AllowedUsers) => {
  return (request: Request, response: Response, next: NextFunction) => {
    const token = request.get('authorization')
    const authToken = token?.split(' ')[1] ?? ''
    if (!token || !authToken) {
      return response.status(401).send({
        data: null,
        errors: ['Please provide a valid authentication token'],
      })
    }

    try {
      const decryptToken = decrypt(authToken, SECRET)
      const obj: ITokenData = verifyToken(
        decryptToken,
        JWT_SECRET,
      ) as ITokenData
      request['user'] = obj as ITokenData

      if (userType && userType !== obj.type) {
        return response.status(403).send({
          data: null,
          errors: ['Unauthorized access'],
        })
      }
    } catch (err) {
      Logger.error(err)
      return response.status(401).send({
        data: null,
        errors: ['Invalid token'],
      })
    }
    next()
  }
}

export const authenticateForAdmin = authenticateRequest(AllowedUsers.ADMIN)
export const authenticateForUser = authenticateRequest(AllowedUsers.ENDUSER)
export const authenticateForAny = authenticateRequest()
