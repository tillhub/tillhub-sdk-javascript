import { BaseError } from './baseError'

export class TagsFetchAllFailed extends BaseError {
  public name = 'TagsFetchAllFailed'
  constructor(public message: string = 'Could not fetch all tags', properties?: any) {
    super(message, properties)
  }
}

export class TagsFetchOneFailed extends BaseError {
  public name = 'TagsFetchOneFailed'
  constructor(public message: string = 'Could not fetch single tag', properties?: any) {
    super(message, properties)
  }
}

export class TagsGetMetaFailed extends BaseError {
  public name = 'TagsGetMetaFailed'
  constructor(public message: string = 'Could not fetch meta data for tags', properties?: any) {
    super(message, properties)
  }
}

export class TagsCreationFailed extends BaseError {
  public name = 'TagsCreationFailed'
  constructor(public message: string = 'Could not create tags', properties?: any) {
    super(message, properties)
  }
}

export class TagsPutFailed extends BaseError {
  public name = 'TagsPutFailed'
  constructor(public message: string = 'Could not update tags', properties?: any) {
    super(message, properties)
  }
}
