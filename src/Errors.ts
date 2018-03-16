export declare class ErrorClass implements Error {
  public name: string
  public message: string
  constructor(message?: string)
}

export class AuthenticationFailed extends ErrorClass {
  public name = 'AuthenticationFailed'
  constructor(public message: string = 'Authenticat was not successful') {
    super(message)
  }
}
