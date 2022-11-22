import { BaseError } from './baseError'

export class ProductBranchCustomizationsFetchAllFailed extends BaseError {
  public name = 'ProductBranchCustomizationsFetchAllFailed'
  constructor (
    public message: string = 'Could not fetch all product branch customizations',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductBranchCustomizationsFetchAllFailed.prototype)
  }
}

export class ProductBranchCustomizationCreationFailed extends BaseError {
  public name = 'ProductBranchCustomizationCreationFailed'
  constructor (
    public message: string = 'Could not create product branch customization',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductBranchCustomizationCreationFailed.prototype)
  }
}

export class ProductBranchCustomizationPutFailed extends BaseError {
  public name = 'ProductBranchCustomizationPutFailed'
  constructor (
    public message: string = 'Could not update product branch customization',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductBranchCustomizationPutFailed.prototype)
  }
}

export class ProductBranchCustomizationDeleteFailed extends BaseError {
  public name = 'ProductBranchCustomizationDeleteFailed'
  constructor (
    public message: string = 'Could not delete product branch customization',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductBranchCustomizationDeleteFailed.prototype)
  }
}
