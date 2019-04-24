import { BaseError } from './baseError'

export class TagsFetchAllFailed extends BaseError {
  public name = 'TagsFetchAllFailed'
  constructor(public message: string = 'Could not fetch all tags', properties?: any) {
    super(message, properties)
  }
}

export class TagsGetMetaFailed extends BaseError {
  public name = 'TagsGetMetaFailed'
  constructor(public message: string = 'Could not fetch meta data for tags', properties?: any) {
    super(message, properties)
  }
}
