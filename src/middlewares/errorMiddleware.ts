import { NextFunction, Request, Response } from 'express';
import ErrorBase from '../errors/ErrorBase';

const errorMiddleware = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ErrorBase) {
    return res.status(err.statusCode).json({ message: err.errorMessage });
  }
  return res.status(500).json({ message: 'Internal server error' });
};

export default errorMiddleware;
