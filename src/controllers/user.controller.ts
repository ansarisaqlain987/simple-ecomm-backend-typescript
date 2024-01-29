import { SECRET } from '../config/app.config'
import {
  createUser,
  getUserByEmail,
  getUserList,
  updateUserDetails,
} from '../services/user.service'
import { Controller, Document, IUser, Request, Response } from '../types'
import { decrypt, encrypt } from '../utils/jwt.util'
import { Logger } from '../utils/logger.util'
import { getErrorResponse } from '../utils/response.util'

export const registerUser: Controller = async (
  request: Request<IUser>,
  response: Response,
) => {
  try {
    const { email, password, firstName, lastName } = request.body
    const record: Document | null = await getUserByEmail(email)

    if (record) {
      return response.status(400).send({
        data: null,
        errors: ['User already exist with the provided email'],
      })
    }

    const encryptedPassword: string = encrypt(password, SECRET)
    const admin: Document = await createUser({
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
    Logger.error(err)
    return getErrorResponse(response, err)
  }
}

type InputUpdateUser = Pick<IUser, 'firstName' | 'lastName'>
export const updateUser: Controller = async (
  request: Request<InputUpdateUser>,
  response: Response,
) => {
  try {
    const { firstName, lastName } = request.body
    const { id = '' } = request?.user ?? {}
    const admin: Document<IUser> | null = await updateUserDetails(id, {
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
    Logger.error(err)
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
    const record = await getUserByEmail(email, { _id: 1, password: 1 })
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
    const admin: Document<IUser> | null = await updateUserDetails(id, {
      password: encryptedPassword,
    })
    return response.status(200).send({
      data: {
        email: admin?.email,
      },
      errors: null,
    })
  } catch (err) {
    Logger.error(err)
    return getErrorResponse(response, err)
  }
}

export const login: Controller = (request: Request, response: Response) => {
  return response.send({
    data: null,
    errors: null,
  })
}

export const details: Controller = async (
  request: Request,
  response: Response,
) => {
  try {
    const { email = '' } = request?.user ?? {}
    const details = await getUserByEmail(email)
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

export const userList: Controller = async (
  request: Request,
  response: Response,
) => {
  try {
    const details = await getUserList({
      _id: 1,
      email: 1,
      firstName: 1,
      lastName: 1,
    })
    return response.status(200).send({
      data: details ?? [],
      errors: null,
    })
  } catch (err) {
    Logger.error(err)
    return getErrorResponse(response, err)
  }
}
