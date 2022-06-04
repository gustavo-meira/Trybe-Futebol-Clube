import ErrorBase from './ErrorBase';

class UnauthorizedError extends ErrorBase {
  constructor(message: string) {
    super(message);
    this._statusCode = 401;
  }
}

export default UnauthorizedError;
