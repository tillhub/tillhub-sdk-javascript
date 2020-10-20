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
  uri?: string
}

export interface ProcessItemsQueryOptions {
  format?: string
}

export interface ProcessesResponse {
  data: Process[]
  metadata: Record<string, unknown>
  next?: () => Promise<ProcessesResponse>
}

export interface ProcessResponse {
  data?: Process
  metadata?: Record<string, unknown>
  msg?: string
}

export interface ProcessItemsObject {
  code: string
  amount: number
}

export interface ProcessItems {
  items: ProcessItemsObject[]
}

export interface ProcessesItemsResponse {
  data: ProcessItems
  metadata: Record<string, unknown>
}

export interface Process {
  started_at?: string
  finished_at?: string
  assigned_staff?: string
  status?: string
  name?: string
  result?: Record<string, unknown> | ProcessItemsObject
  deleted?: boolean
}

export class Processes extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/processes'
  endpoint: string
  http: Client
  public options: ProcessesOptions
  public uriHelper: UriHelper

  constructor (options: ProcessesOptions, http: Client) {
    super(http, {
      endpoint: Processes.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = Processes.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async create (process: Process): Promise<ProcessResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri()

      const response = await this.http.getClient().post(uri, process)
      if (response.status !== 200) {
        throw new ProcessesCreationFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (error) {
      throw new ProcessesCreationFailed(undefined, { error })
    }
  }

  async getAll (query?: ProcessesQueryOptions): Promise<ProcessesResponse> {
    let next

    try {
      const baseUri = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(baseUri, query)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new ProcessesFetchFailed(undefined, { status: response.status })
      }

      if (response.data.cursor?.next) {
        next = (): Promise<ProcessesResponse> => this.getAll({ uri: response.data.cursor.next })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count },
        next
      }
    } catch (error) {
      throw new ProcessesFetchFailed(undefined, { error })
    }
  }

  async get (processId: string, query?: ProcessesQueryOptions): Promise<ProcessResponse> {
    try {
      const baseUri = this.uriHelper.generateBaseUri(`/${processId}`)
      const uri = this.uriHelper.generateUriWithQuery(baseUri, query)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) { throw new ProcessesFetchOneFailed(undefined, { status: response.status }) }

      return {
        data: response.data.results[0],
        metadata: { count: 1 }
      }
    } catch (error) {
      throw new ProcessesFetchOneFailed(undefined, { error })
    }
  }

  async update (processId: string, process: Process): Promise<ProcessResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri(`/${processId}`)

      const response = await this.http.getClient().patch(uri, process)
      if (response.status !== 200) { throw new ProcessesUpdateFailed(undefined, { status: response.status }) }

      return {
        data: response.data.results[0] as Process,
        metadata: { count: response.data.count }
      }
    } catch (error) {
      throw new ProcessesUpdateFailed(undefined, { error })
    }
  }

  async delete (processId: string): Promise<ProcessResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri(`/${processId}`)

      const response = await this.http.getClient().delete(uri)
      if (response.status !== 200) { throw new ProcessesDeleteFailed(undefined, { status: response.status }) }

      return {
        msg: response.data.msg
      }
    } catch (error) {
      throw new ProcessesDeleteFailed(undefined, { error })
    }
  }

  async getItems (processId: string, query?: ProcessItemsQueryOptions): Promise<ProcessesItemsResponse> {
    try {
      const baseUri = this.uriHelper.generateBaseUri(`/${processId}/items`)
      const uri = this.uriHelper.generateUriWithQuery(baseUri, query)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) { throw new ProcessItemsFetchFailed(undefined, { state: response.status }) }

      return {
        data: response.data.results as ProcessItems,
        metadata: { count: response.data.count }
      }
    } catch (error) {
      throw new ProcessItemsFetchFailed(undefined, { error })
    }
  }

  async meta (query?: ProcessesQueryOptions): Promise<ProcessesResponse> {
    const base = this.uriHelper.generateBaseUri('/meta')
    const uri = this.uriHelper.generateUriWithQuery(base, query)

    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new ProcessesMetaFailed(undefined, { status: response.status })
      }
      if (!response.data.results[0]) {
        throw new ProcessesMetaFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (err) {
      throw new ProcessesMetaFailed(undefined, { error: err })
    }
  }
}

export class ProcessesFetchFailed extends BaseError {
  public name = 'ProcessesFetchFailed'
  constructor (
    public message: string = 'Could not fetch processes',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProcessesFetchFailed.prototype)
  }
}

export class ProcessesFetchOneFailed extends BaseError {
  public name = 'ProcessesFetchOneFailed'
  constructor (
    public message: string = 'Could not fetch one process',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProcessesFetchOneFailed.prototype)
  }
}

export class ProcessesUpdateFailed extends BaseError {
  public name = 'ProcessesUpdateFailed'
  constructor (
    public message: string = 'Could not update process',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProcessesUpdateFailed.prototype)
  }
}

export class ProcessesCreationFailed extends BaseError {
  public name = 'ProcessesCreationFailed'
  constructor (
    public message: string = 'Could not create process',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProcessesCreationFailed.prototype)
  }
}

export class ProcessesDeleteFailed extends BaseError {
  public name = 'ProcessesDeleteFailed'
  constructor (
    public message: string = 'Could not delete process',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProcessesDeleteFailed.prototype)
  }
}

export class ProcessItemsFetchFailed extends BaseError {
  public name = 'ProcessItemsFetchFailed'
  constructor (
    public message: string = "Could not fetch one process' items",
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProcessItemsFetchFailed.prototype)
  }
}

export class ProcessesMetaFailed extends BaseError {
  public name = 'ProcessesMetaFailed'
  constructor (
    public message: string = 'Could not get meta of Processes',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProcessesMetaFailed.prototype)
  }
}
