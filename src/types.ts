import {
  Request as ExpressRequest,
  Response as ExpressResponse,
  NextFunction as ExpressNextFunction,
  Express as Ex,
  Router as Rt,
} from 'express';

// Interfaces
export interface IUser {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

export interface IAdmin {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

export interface IProduct {
  name: string;
  description: string;
  images: string[];
  price: number;
}

export interface OrderItem {
  product: string; // product id
  price: number; // product price at the time of purchase
  quantity: number;
}

export interface IOrder {
  orderId: string; // order id;
  user: string; // user id;
  items: OrderItem[];
  total: number;
  orderDate: string;
}

export interface IReview {
  description: string;
  user: string;
  product: string;
  rating: number;
}

// types
export interface ITokenData {
  id: string;
}
export type ResponseType<T = any> = {
  data: T;
  errors: any;
};
export type Express = Ex;
export type Router = Rt;
export type Request<Body = any, Params = any, Query = any> = ExpressRequest<
  Params,
  {},
  Body,
  Query
> & { user?: ITokenData };
export type Response<DataType = any> = ExpressResponse<ResponseType<DataType>>;
export type NextFunction = ExpressNextFunction;
export enum AllowedUsers {
  ENDUSER = 'USER',
  ADMIN = 'ADMIN',
}
export type Controller<> = (
  request: Request,
  response: Response,
  next?: NextFunction,
) => Response;
export type Middleware = (
  request: Request,
  response: Response,
  next?: NextFunction,
) => Response | void;
