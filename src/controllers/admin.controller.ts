import { JWT_SECRET, SECRET } from '../config/app.config'
import {
  createAdmin,
  getAdminByEmail,
  updateAdminDetails,
} from '../services/admin.service'
import {
  AllowedUsers,
  Controller,
  Document,
  IAdmin,
  ITokenData,
  Request,
  Response,
} from '../types'
import { createToken, decrypt, encrypt } from '../utils/jwt.util'
import { Logger } from '../utils/logger.util'
import { getErrorResponse } from '../utils/response.util'

export const addAdmin: Controller = async (
  request: Request<IAdmin>,
  response: Response,
) => {
  try {
    const { email, password, firstName, lastName } = request.body
    const record: Document = await getAdminByEmail(email)

    if (record) {
      return response.status(400).send({
        data: null,
        errors: ['Admin already exist with the provided email'],
      })
    }

    const encryptedPassword: string = encrypt(password, SECRET)
    const admin: Document = await createAdmin({
      email: email,
      password: encryptedPassword,
      firstName: firstName,
      lastName: lastName,
    })

    return response.status(201).send({
      data: {
        firstName,
        lastName,
        email,
        id: admin?._id,
      },
      errors: null,
    })
  } catch (err) {
    Logger.info(err)
    return getErrorResponse(response, err)
  }
}

type InputUpdateAdmin = Pick<IAdmin, 'firstName' | 'lastName'>
export const updateAdmin: Controller = async (
  request: Request<InputUpdateAdmin>,
  response: Response,
) => {
  try {
    const { firstName, lastName } = request.body
    const { id = '' } = request?.user ?? {}
    const admin: Partial<IAdmin> = await updateAdminDetails(id, {
      firstName,
      lastName,
    })

    return response.status(200).send({
      data: {
        firstName: admin?.firstName,
        lastName: admin?.lastName,
        email: admin?.email,
      },
      errors: null,
    })
  } catch (err) {
    Logger.info(err)
    return getErrorResponse(response, err)
  }
}

export const resetPassword: Controller = (
  request: Request,
  response: Response,
) => {
  return response.send({
    data: null,
    errors: null,
  })
}

export const details: Controller = (request: Request, response: Response) => {
  return response.send({
    data: null,
    errors: null,
  })
}

type InputAdminLogin = Pick<IAdmin, 'email' | 'password'>
export const adminLogin: Controller = async (
  request: Request<InputAdminLogin>,
  response: Response,
) => {
  const { email, password } = request?.body ?? {}
  const record = await getAdminByEmail(email, { _id: 1, password: 1 })
  if (!record) {
    return response.status(401).send({
      data: null,
      errors: ['User with the email does not exist'],
    })
  }
  const storedPassword = decrypt(record?.password, SECRET)
  if (password !== storedPassword) {
    return response.status(401).send({
      data: null,
      errors: ['Invalid password'],
    })
  }

  const obj: ITokenData = {
    email: email,
    id: record?._id?.toString(),
    type: AllowedUsers.ADMIN,
  }

  const token = createToken(JSON.stringify(obj), JWT_SECRET)
  const encryptedToken = encrypt(token, SECRET)

  return response.status(200).send({
    data: {
      token: encryptedToken,
      email: email,
      id: record?._id,
    },
    errors: null,
  })
}
