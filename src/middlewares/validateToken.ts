import { NextFunction, Request, Response } from 'express';
import UnauthorizedError from '../errors/UnauthorizedError';
import JWT from '../helpers/JWT';

const validateToken = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    const decoded = await JWT.verifyToken(token as string);
    if (!decoded) {
      throw new UnauthorizedError('Invalid token');
    }
    req.body.userDecoded = decoded;
    next();
  } catch (err) {
    next(err);
  }
};

export default validateToken;
