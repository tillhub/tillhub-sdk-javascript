import { BaseError } from './baseError'

export class TagsFetchAllFailed extends BaseError {
  public name = 'TagsFetchAllFailed'
  constructor (
    public message: string = 'Could not fetch all tags',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, TagsFetchAllFailed.prototype)
  }
}

export class TagsFetchOneFailed extends BaseError {
  public name = 'TagsFetchOneFailed'
  constructor (
    public message: string = 'Could not fetch single tag',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, TagsFetchOneFailed.prototype)
  }
}

export class TagsGetMetaFailed extends BaseError {
  public name = 'TagsGetMetaFailed'
  constructor (
    public message: string = 'Could not fetch meta data for tags',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, TagsGetMetaFailed.prototype)
  }
}

export class TagsCreationFailed extends BaseError {
  public name = 'TagsCreationFailed'
  constructor (
    public message: string = 'Could not create tags',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, TagsCreationFailed.prototype)
  }
}

export class TagsPutFailed extends BaseError {
  public name = 'TagsPutFailed'
  constructor (
    public message: string = 'Could not update tags',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, TagsPutFailed.prototype)
  }
}
