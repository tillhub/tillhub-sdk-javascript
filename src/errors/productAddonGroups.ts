import { BaseError } from './baseError'

export class ProductAddonGroupsFetchAllFailed extends BaseError {
  public name = 'ProductAddonGroupsFetchAllFailed'
  constructor (
    public message: string = 'Could not fetch all product addon groups',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductAddonGroupsFetchAllFailed.prototype)
  }
}

export class ProductAddonGroupFetchOneFailed extends BaseError {
  public name = 'ProductAddonGroupFetchOneFailed'
  constructor (
    public message: string = 'Could not fetch single product addon group',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductAddonGroupFetchOneFailed.prototype)
  }
}

export class ProductAddonGroupsGetMetaFailed extends BaseError {
  public name = 'ProductAddonGroupsGetMetaFailed'
  constructor (
    public message: string = 'Could not fetch meta data for product addon group',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductAddonGroupsGetMetaFailed.prototype)
  }
}

export class ProductAddonGroupCreationFailed extends BaseError {
  public name = 'ProductAddonGroupCreationFailed'
  constructor (
    public message: string = 'Could not create product addon group',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductAddonGroupCreationFailed.prototype)
  }
}

export class ProductAddonGroupPutFailed extends BaseError {
  public name = 'ProductAddonGroupPutFailed'
  constructor (
    public message: string = 'Could not update product addon group',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductAddonGroupPutFailed.prototype)
  }
}

export class ProductAddonGroupDeleteFailed extends BaseError {
  public name = 'ProductAddonGroupDeleteFailed'
  constructor (
    public message: string = 'Could not delete product addon group',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductAddonGroupDeleteFailed.prototype)
  }
}
