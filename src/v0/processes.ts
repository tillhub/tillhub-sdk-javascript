import { Client } from '../client'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'
import { BaseError } from '../errors'

export interface ProcessesOptions {
  user?: string
  base?: string
}

export interface ProcessesQueryOptions {
  read?: boolean
  ignored?: boolean
  min_updated_at?: string
  format?: string
}

export interface ProcessItemsQueryOptions {
  format?: string
}

export interface ProcessesResponse {
  data: Process[]
  metadata: object
}

export interface ProcessResponse {
  data: Process
  metadata: object
}

export interface ProcessItemsObject {
  code: string,
  amount: number
}

export interface ProcessItems {
  items: ProcessItemsObject[]
}

export interface ProcessesItemsResponse {
  data: ProcessItems
  metadata: object
}

export interface Process {
  started_at?: string
  finished_at?: string
  assigned_staff?: string
  status?: string
  result?: object | ProcessItemsObject
}

export class Processes extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/processes'
  endpoint: string
  http: Client
  public options: ProcessesOptions
  public uriHelper: UriHelper

  constructor(options: ProcessesOptions, http: Client) {
    super(http, { endpoint: Processes.baseEndpoint, base: options.base || 'https://api.tillhub.com' })
    this.options = options
    this.http = http

    this.endpoint = Processes.baseEndpoint
    this.options.base = this.options.base || 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  create(process: Process): Promise<ProcessResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const uri = this.uriHelper.generateBaseUri()

        const response = await this.http.getClient().post(uri, process)
        response.status !== 200 && reject(new ProcessesCreationFailed(undefined, { status: response.status }))

        return resolve({
          data: response.data.results[0],
          metadata: { count: response.data.count }
        } as ProcessResponse)
      } catch (error) {
        return reject(new ProcessesCreationFailed(undefined, { error }))
      }
    })
  }

  getAll(query?: ProcessesQueryOptions): Promise<ProcessesResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const baseUri = this.uriHelper.generateBaseUri()
        const uri = this.uriHelper.generateUriWithQuery(baseUri, query)

        const response = await this.http.getClient().get(uri)
        response.status !== 200 && reject(new ProcessesFetchFailed(undefined, { status: response.status }))

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as ProcessesResponse)
      } catch (error) {
        return reject(new ProcessesFetchFailed(undefined, { error }))
      }
    })
  }

  get(processId: string, query?: ProcessesQueryOptions): Promise<ProcessResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const baseUri = this.uriHelper.generateBaseUri(`/${processId}`)
        const uri = this.uriHelper.generateUriWithQuery(baseUri, query)

        const response = await this.http.getClient().get(uri)
        response.status !== 200 && reject(new ProcessesFetchOneFailed(undefined, { status: response.status }))

        return resolve({
          data: response.data.results[0],
          metadata: { count: 1 }
        } as ProcessResponse)
      } catch (error) {
        return reject(new ProcessesFetchOneFailed(undefined, { error }))
      }
    })
  }

  update(processId: string, process: Process): Promise<ProcessResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const uri = this.uriHelper.generateBaseUri(`/${processId}`)

        const response = await this.http.getClient().patch(uri, process)
        response.status !== 200 && reject(new ProcessesUpdateFailed(undefined, { status: response.status }))

        return resolve({
          data: response.data.results[0] as Process,
          metadata: { count: response.data.count }
        } as ProcessResponse)
      } catch (error) {
        return reject(new ProcessesUpdateFailed(undefined, { error }))
      }
    })
  }

  getItems(processId: string, query?: ProcessItemsQueryOptions): Promise<ProcessesItemsResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const baseUri = this.uriHelper.generateBaseUri(`/${processId}/items`)
        const uri = this.uriHelper.generateUriWithQuery(baseUri, query)

        const response = await this.http.getClient().get(uri)
        response.status !== 200 && reject(new ProcessItemsFetchFailed(undefined, { state: response.status }))

        return resolve({
          data: response.data.results[0] as ProcessItems,
          metadata: { count: response.data.count }
        } as ProcessesItemsResponse)
      } catch (error) {
        return reject(new ProcessItemsFetchFailed(undefined, { error }))
      }
    })
  }
}

export class ProcessesFetchFailed extends BaseError {
  public name = 'ProcessesFetchFailed'
  constructor(public message: string = 'Could not fetch processes', properties?: any) {
    super(message, properties)
  }
}

export class ProcessesFetchOneFailed extends BaseError {
  public name = 'ProcessesFetchOneFailed'
  constructor(public message: string = 'Could not fetch one process', properties?: any) {
    super(message, properties)
  }
}

export class ProcessesUpdateFailed extends BaseError {
  public name = 'ProcessesUpdateFailed'
  constructor(public message: string = 'Could not update process', properties?: any) {
    super(message, properties)
  }
}

export class ProcessesCreationFailed extends BaseError {
  public name = 'ProcessesCreationFailed'
  constructor(public message: string = 'Could not create process', properties?: any) {
    super(message, properties)
  }
}

export class ProcessesDeleteFailed extends BaseError {
  public name = 'ProcessesDeleteFailed'
  constructor(public message: string = 'Could not delete process', properties?: any) {
    super(message, properties)
  }
}

export class ProcessItemsFetchFailed extends BaseError {
  public name = 'ProcessItemsFetchFailed'
  constructor(public message: string = 'Could not fetch one process\' items', properties?: any) {
    super(message, properties)
  }
}
