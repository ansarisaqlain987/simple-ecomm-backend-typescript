import { Validator } from 'node-input-validator';
import { AllowedUsers, NextFunction, Request, Response } from '../types';

export const validate = (schema: object) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const v = new Validator(request.body, schema);
    const matched = await v.check();
    if (!matched) {
      return response.status(422).send({
        data: null,
        errors: v.errors,
      });
    }
    next();
  };
};
