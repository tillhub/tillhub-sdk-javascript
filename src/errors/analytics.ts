import { BaseError } from './baseError'

export class ReportsFetchAllFailed extends BaseError {
  public handler = 'AnalyticsReports'
  public name: string
  public message: string
  constructor(
    name: string,
    message?: string,
    properties?: any
  ) {
    super(message || name, properties)
    this.name = `${name}FetchFailed`
    this.message = message || `Could not fetch all ${name.toLocaleLowerCase()}`
  }
}

export class ReportsFetchOneFailed extends BaseError {
  public handler = 'AnalyticsReports'
  public name: string
  public message: string
  constructor(
    name: string,
    message?: string,
    properties?: any
  ) {
    super(message || name, properties)
    this.name = `${name}FetchOneFailed`
    this.message = message || `Could not fetch the ${name.toLocaleLowerCase()}`
  }
}

export class ReportsFetchMetaFailed extends BaseError {
  public handler = 'AnalyticsReports'
  public name: string
  public message: string
  constructor(
    name: string,
    message?: string,
    properties?: any
  ) {
    super(message || name, properties)
    this.name = `${name}FetchMetaFailed`
    this.message = message || `Could not fetch ${name.toLocaleLowerCase()} meta`
  }
}
