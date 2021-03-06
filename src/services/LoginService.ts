import * as BCryptjs from 'bcryptjs';
import JWT from '../helpers/JWT';
import User from '../database/models/user';
import ILoginService, { userReceived, userResponse } from './ILoginService';
import UnauthorizedError from '../errors/UnauthorizedError';

class LoginService implements ILoginService {
  private userRepository = User;
  private jwt = JWT;

  async login(user: userReceived): Promise<[string, userResponse]> {
    const userRegistered = await this.userRepository.findOne({ where: { email: user.email } });

    if (!userRegistered) {
      throw new UnauthorizedError('Incorrect email or password');
    }

    const isPasswordValid = await BCryptjs.compare(user.password, userRegistered.password);

    if (!isPasswordValid) {
      throw new UnauthorizedError('Incorrect email or password');
    }

    const token = await JWT.generateToken({ id: userRegistered.id, role: userRegistered.role });

    const userResponsed: userResponse = {
      id: userRegistered.id,
      username: userRegistered.username,
      email: userRegistered.email,
      role: userRegistered.role,
    };

    return [token, userResponsed];
  }

  async loginValidate(token: string): Promise<string> {
    type decodedUser = {
      role: string,
      id: number,
    };

    const decodedToken = await this.jwt.verifyToken(token) as decodedUser;

    if (!decodedToken) {
      throw new UnauthorizedError('Invalid token');
    }

    return decodedToken.role;
  }
}

export default LoginService;
