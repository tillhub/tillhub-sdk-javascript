
export class BaseError {
  constructor(message: string) {
    Error.apply(this, arguments)
  }
}

BaseError.prototype = new Error()

export class AuthenticationFailed extends BaseError {
  public name = 'AuthenticationFailed'
  constructor(public message: string = 'Authentication was not successful') {
    super(message)
  }
}
