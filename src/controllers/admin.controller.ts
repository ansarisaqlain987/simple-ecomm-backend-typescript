import { SECRET } from '../config/app.config'
import { AdminModel } from '../models/admin.model'
import { Controller, IAdmin, Request, Response } from '../types'
import { encrypt } from '../utils/jwt.util'
import { Logger } from '../utils/logger.util'
import { getErrorResponse } from '../utils/response.util'

export const addAdmin: Controller = async (
  request: Request<IAdmin>,
  response: Response,
) => {
  try {
    const { email, password, firstName, lastName } = request.body
    const record = await AdminModel.findOne({ email: email }).exec()

    if (record) {
      return response.status(400).send({
        data: null,
        errors: ['Admin already exist with the provided email'],
      })
    }

    const encryptedPassword = encrypt(password, SECRET)
    const admin = await AdminModel.create({
      email: email?.toLowerCase(),
      password: encryptedPassword,
      firstName: firstName?.toLowerCase(),
      lastName: lastName?.toLowerCase(),
    })
    admin.save()

    return response.status(201).send({
      data: {
        firstName,
        lastName,
        email,
        id: admin._id,
      },
      errors: null,
    })
  } catch (err) {
    Logger.info(err)
    return getErrorResponse(response, err)
  }
}

export const updateAdmin: Controller = (
  request: Request,
  response: Response,
) => {
  return response.send({
    data: null,
    errors: null,
  })
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

export const adminLogin: Controller = (
  request: Request,
  response: Response,
) => {
  return response.send({
    data: null,
    errors: null,
  })
}
