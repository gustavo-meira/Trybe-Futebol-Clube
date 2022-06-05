type userReceived = {
  email: string,
  password: string,
};

type userResponse = {
  id: number,
  username: string,
  role: string,
  email: string,
};

type token = string;

export { userReceived, userResponse };

interface ILoginService {
  login(user: userReceived): Promise<[token, userResponse]>;
  loginValidate(token: token): Promise<string>;
}

export default ILoginService;
