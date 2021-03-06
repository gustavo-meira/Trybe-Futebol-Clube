import { Request, Response, NextFunction } from 'express';
import ILoginService from '../services/ILoginService';
import ILoginController from './ILoginController';

class LoginController implements ILoginController {
  private loginService: ILoginService;

  constructor(loginService: ILoginService) {
    this.loginService = loginService;
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const [token, user] = await this.loginService.login({ email, password });
      res.status(200).json({ token, user });
    } catch (err) {
      next(err);
    }
  }

  async loginValidate(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.headers.authorization;
      const role = await this.loginService.loginValidate(token as string);
      res.status(200).json(role);
    } catch (err) {
      next(err);
    }
  }
}

export default LoginController;
