import serializeError from 'serialize-error'

export class BaseError extends Error {
  public properties?: any
  public message: string

  constructor(message: string, properties?: any) {
    super()
    this.message = message

    if (properties && properties.error && (properties.error instanceof Error)) {
      properties.error = serializeError(properties.error)
    }

    this.properties = properties

    Object.setPrototypeOf(this, BaseError.prototype)
  }
}
