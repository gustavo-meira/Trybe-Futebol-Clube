abstract class ErrorBase extends Error {
  protected _errorMessage: string;
  protected _statusCode: number;

  constructor(message: string) {
    super(message);
    this._errorMessage = message;
    this._statusCode = 500;
  }

  get statusCode(): number {
    return this._statusCode;
  }

  get errorMessage(): string {
    return this._errorMessage;
  }
}

export default ErrorBase;
