export class BaseError extends Error {
  public properties?: Record<string, unknown>
  public message: string

  constructor (message: string, properties?: Record<string, unknown>) {
    super()
    this.message = message

    this.properties = properties

    Object.setPrototypeOf(this, BaseError.prototype)
  }
}
