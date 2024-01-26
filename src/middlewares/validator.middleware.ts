import { Validator } from 'node-input-validator'
import { NextFunction, Request, Response } from '../types'

export const validate = (schema: object, source: 'body' | 'query' = 'body') => {
  return async (request: Request, response: Response, next: NextFunction) => {
    console.log(source)
    const v = new Validator(request.body as object, schema)
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
