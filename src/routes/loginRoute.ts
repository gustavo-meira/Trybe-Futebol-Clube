import { NextFunction, Request, Response, Router } from 'express';
import validateUserLogin from '../middlewares/ValidateUserLogin';
import LoginController from '../controllers/LoginController';
import LoginService from '../services/LoginService';

const loginService = new LoginService();
const loginController = new LoginController(loginService);

const loginRoutes = Router();

loginRoutes.post('/', validateUserLogin, (req: Request, res: Response, next: NextFunction) => {
  loginController.login(req, res, next);
});

loginRoutes.get('/validate', (req: Request, res: Response, next: NextFunction) => {
  loginController.loginValidate(req, res, next);
});

export default loginRoutes;
