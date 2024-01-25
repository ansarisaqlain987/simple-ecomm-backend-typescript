import { AllowedUsers, NextFunction, Request, Response } from '../types';

export const authenticateRequest = (userType?: AllowedUsers) => {
  return (request: Request, response: Response, next: NextFunction) => {
    next();
  };
};

export const authenticateForAdmin = authenticateRequest(AllowedUsers.ADMIN);
export const authenticateForUser = authenticateRequest(AllowedUsers.ENDUSER);
export const authenticateForAny = authenticateRequest();
