import ErrorBase from './ErrorBase';

class NotFoundError extends ErrorBase {
  constructor(message: string) {
    super(message);
    this._statusCode = 404;
  }
}

export default NotFoundError;
