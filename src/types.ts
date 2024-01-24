import {Request as ExpressRequest, Response as ExpressResponse, NextFunction as ExpressNextFunction, Express as Ex, Router as Rt} from 'express';


// Interfaces
export interface IUser {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
}

export interface IAdmin {
    email: string;
    password: string;
}

// types
export type ITokenData = {
    id: string;
}
export type Express = Ex;
export type Router = Rt;
export type Request = ExpressRequest & {user?: ITokenData};
export type Response = ExpressResponse;
export type NextFunction = ExpressNextFunction;

export type Controller = (request: Request, response: Response, next?: NextFunction) => Response;
export type Middleware = (request: Request, response: Response, next?: NextFunction) => Response | void