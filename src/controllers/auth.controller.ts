import { Controller, Request, Response } from "../types";
import { Logger } from "../utils/logger.util";

export const AdminLogin: Controller = (request: Request, response: Response): Response => {
    Logger.info("Admin Login");
    return response.send({})
}