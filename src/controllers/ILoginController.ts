import { NextFunction, Request, Response } from 'express';

interface ILoginController {
  login(req: Request, res: Response, next: NextFunction): Promise<void>;
  loginValidate(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export default ILoginController;
