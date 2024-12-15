import { Request, Response, NextFunction } from 'express';
export declare const generateToken: (payload: object) => string;
export declare const verifyToken: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
