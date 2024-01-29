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

type InputResetPassword = {
  password: string
  newPassword: string
}
export const resetPassword: Controller = async (
  request: Request<InputResetPassword>,
  response: Response,
) => {
  try {
    const { password, newPassword } = request.body
    const { email = '', id = '' } = request?.user ?? {}
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
    const encryptedPassword: string = encrypt(newPassword, SECRET)
    const admin: Partial<IAdmin> = await updateAdminDetails(id, {
      password: encryptedPassword,
    })
    return response.status(200).send({
      data: {
        email: admin.email,
      },
      errors: null,
    })
  } catch (err) {
    Logger.error(err)
    return getErrorResponse(response, err)
  }
}

export const details: Controller = async (
  request: Request,
  response: Response<Partial<IAdmin>>,
) => {
  try {
    const { email = '' } = request?.user ?? {}
    const details = await getAdminByEmail(email)
    return response.status(200).send({
      data: {
        firstName: details?.firstName,
        lastName: details?.lastName,
        email: details?.email,
      },
      errors: null,
    })
  } catch (err) {
    Logger.error(err)
    return getErrorResponse(response, err)
  }
}

type InputAdminLogin = Pick<IAdmin, 'email' | 'password'>
export const adminLogin: Controller = async (
  request: Request<InputAdminLogin>,
  response: Response,
) => {
  try {
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
  } catch (err) {
    Logger.error(err)
    return getErrorResponse(response, err)
  }
}
