import { Response } from '../types'

export const getErrorResponse = (
  response: Response,
  errors: unknown = [],
): Response => {
  return response.status(500).send({
    data: null,
    errors: ['Unable to process request', errors],
  })
}
