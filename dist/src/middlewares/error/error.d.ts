import { NextFunction, Request, Response } from "express";
import { HttpException } from '../../exceptions/httpException';
declare const errorMiddleware: (error: HttpException, req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>>;
export default errorMiddleware;
