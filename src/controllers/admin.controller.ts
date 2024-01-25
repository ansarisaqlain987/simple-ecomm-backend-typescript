import { Controller, IAdmin, Request, Response } from '../types';

export const addAdmin: Controller = (
  request: Request<IAdmin>,
  response: Response,
) => {
  const requestBody = request.body;
  return response.send({
    data: null,
    errors: null,
  });
};

export const updateAdmin: Controller = (
  request: Request,
  response: Response,
) => {
  return response.send({
    data: null,
    errors: null,
  });
};

export const resetPassword: Controller = (
  request: Request,
  response: Response,
) => {
  return response.send({
    data: null,
    errors: null,
  });
};

export const details: Controller = (request: Request, response: Response) => {
  return response.send({
    data: null,
    errors: null,
  });
};

export const adminLogin: Controller = (
  request: Request,
  response: Response,
) => {
  return response.send({
    data: null,
    errors: null,
  });
};
