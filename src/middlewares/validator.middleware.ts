import { Validator } from 'node-input-validator'
import { NextFunction, Request, Response } from '../types'

export const validate = (schema: object, source: 'body' | 'query' = 'body') => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const obj: object = request[source]
    const v = new Validator(obj, schema)
    const matched = await v.check()
    if (!matched) {
      return response.status(422).send({
        data: null,
        errors: v.errors,
      })
    }
    next()
  }
}
