import { Client } from '../client'
import { BaseError } from '../errors'

export interface DataOptions {
  user?: string
  base?: string
}

export interface DataResponse {
  data: object
}

export class Data {
  endpoint: string
  http: Client
  public options: DataOptions

  constructor(options: DataOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v0/data'
    this.options.base = this.options.base || 'https://api.tillhub.com'
  }

  replace(dataId: string, payload: FormData): Promise<DataResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${dataId}`
      try {
        const response = await this.http
          .getClient()
          .put(uri, payload, { timeout: 60000, headers: { 'Content-Type': 'multipart/form-data' } })
        return resolve({
          data: response.data.results
        } as DataResponse)
      } catch (err) {
        return reject(new DataReplaceFailed())
      }
    })
  }

  create(payload: FormData): Promise<DataResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}`
      try {
        const response = await this.http
          .getClient()
          .post(uri, payload, { timeout: 60000, headers: { 'Content-Type': 'multipart/form-data' } })
        return resolve({
          data: response.data.results
        } as DataResponse)
      } catch (err) {
        return reject(new DataCreateFailed())
      }
    })
  }
}

export class DataCreateFailed extends BaseError {
  public name = 'DataCreateFailed'
  constructor(public message: string = 'Could not create data') {
    super(message)
  }
}

export class DataReplaceFailed extends BaseError {
  public name = 'DataReplaceFailed'
  constructor(public message: string = 'Could not replace data') {
    super(message)
  }
}
