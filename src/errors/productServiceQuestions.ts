import { BaseError } from './baseError'

export class ProductServiceQuestionsFetchAllFailed extends BaseError {
  public name = 'ProductServiceQuestionsFetchAllFailed'
  constructor(public message: string = 'Could not fetch all product service question', properties?: any) {
    super(message, properties)
  }
}

export class ProductServiceQuestionsFetchOneFailed extends BaseError {
  public name = 'ProductServiceQuestionsFetchOneFailed'
  constructor(public message: string = 'Could not fetch single product service question', properties?: any) {
    super(message, properties)
  }
}

export class ProductServiceQuestionsGetMetaFailed extends BaseError {
  public name = 'ProductServiceQuestionsGetMetaFailed'
  constructor(public message: string = 'Could not fetch meta data for product service question', properties?: any) {
    super(message, properties)
  }
}

export class ProductServiceQuestionsCreationFailed extends BaseError {
  public name = 'ProductServiceQuestionsCreationFailed'
  constructor(public message: string = 'Could not create product service question', properties?: any) {
    super(message, properties)
  }
}

export class ProductServiceQuestionsPutFailed extends BaseError {
  public name = 'ProductServiceQuestionsPutFailed'
  constructor(public message: string = 'Could not update product service question', properties?: any) {
    super(message, properties)
  }
}

export class ProductServiceQuestionDeleteFailed extends BaseError {
  public name = 'ProductServiceQuestionDeleteFailed'
  constructor(public message: string = 'Could not delete product service question', properties?: any) {
    super(message, properties)
  }
}

export class ProductServiceQuestionsBookFailed extends BaseError {
  public name = 'ProductServiceQuestionsBookFailed'
  constructor(public message: string = 'Could not book transfer in product service questions', properties?: any) {
    super(message, properties)
  }
}
