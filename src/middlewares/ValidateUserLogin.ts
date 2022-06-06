import { NextFunction, Request, Response } from 'express';
import BadRequestError from '../errors/BadRequestError';

const validatePassword = (password: string) => {
  if (password === '' || password === undefined) {
    throw new BadRequestError('All fields must be filled');
  }
};

const validateEmail = (email: string) => {
  if (email === '' || email === undefined) throw new BadRequestError('All fields must be filled');
  if (!email.includes('@')) throw new BadRequestError('Email must be valid');
};

const validateUserLogin = (req: Request, _res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  validatePassword(password);
  validateEmail(email);
  next();
};

export default validateUserLogin;
