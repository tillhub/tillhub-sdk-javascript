import { BaseError } from './baseError'

export class ProductServiceQuestionsFetchAllFailed extends BaseError {
  public name = 'ProductServiceQuestionsFetchAllFailed'
  constructor(
    public message: string = 'Could not fetch all product service question',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductServiceQuestionsFetchAllFailed.prototype)
  }
}

export class ProductServiceQuestionsFetchOneFailed extends BaseError {
  public name = 'ProductServiceQuestionsFetchOneFailed'
  constructor(
    public message: string = 'Could not fetch single product service question',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductServiceQuestionsFetchOneFailed.prototype)
  }
}

export class ProductServiceQuestionsGetMetaFailed extends BaseError {
  public name = 'ProductServiceQuestionsGetMetaFailed'
  constructor(
    public message: string = 'Could not fetch meta data for product service question',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductServiceQuestionsGetMetaFailed.prototype)
  }
}

export class ProductServiceQuestionsCreationFailed extends BaseError {
  public name = 'ProductServiceQuestionsCreationFailed'
  constructor(
    public message: string = 'Could not create product service question',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductServiceQuestionsCreationFailed.prototype)
  }
}

export class ProductServiceQuestionsPutFailed extends BaseError {
  public name = 'ProductServiceQuestionsPutFailed'
  constructor(
    public message: string = 'Could not update product service question',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductServiceQuestionsPutFailed.prototype)
  }
}

export class ProductServiceQuestionDeleteFailed extends BaseError {
  public name = 'ProductServiceQuestionDeleteFailed'
  constructor(
    public message: string = 'Could not delete product service question',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductServiceQuestionDeleteFailed.prototype)
  }
}

export class ProductServiceQuestionsBookFailed extends BaseError {
  public name = 'ProductServiceQuestionsBookFailed'
  constructor(
    public message: string = 'Could not book transfer in product service questions',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductServiceQuestionsBookFailed.prototype)
  }
}
