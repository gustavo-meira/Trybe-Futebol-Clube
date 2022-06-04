import ErrorBase from './ErrorBase';

class BadRequestError extends ErrorBase {
  constructor(message: string) {
    super(message);
    this._statusCode = 400;
  }
}

export default BadRequestError;
