import { Client } from '../client'
import { UriHelper } from '../uri-helper'
import { BaseError } from '../errors/baseError'
import { ThBaseHandler } from '../base'

export interface ServiceStepsOptions {
  user?: string
  base?: string
}

export interface ServiceStepsQuery {
  q?: string
  limit?: number
  uri?: string
  deleted?: boolean
}

export interface ServiceStepsResponse {
  data: ServiceStep[]
  metadata: Record<string, unknown>
  next?: () => Promise<ServiceStepsResponse>
}

export interface ServiceStepResponse {
  data?: ServiceStep
  metadata?: {
    count?: number
  }
  msg?: string
}

export interface ServiceStepLinkedService {
  id: string
  name: string
}

export interface ServiceStep {
  id?: string
  name: string
  duration: number
  active?: boolean
  createdAt?: string
  updatedAt?: string
  deletedAt?: string | null
  services?: ServiceStepLinkedService[]
  servicesCount?: number
}

export class ServiceSteps extends ThBaseHandler {
  public static baseEndpoint = '/api/v1/service-steps'
  endpoint: string
  http: Client
  public options: ServiceStepsOptions
  public uriHelper: UriHelper

  constructor (options: ServiceStepsOptions, http: Client) {
    super(http, {
      endpoint: ServiceSteps.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = ServiceSteps.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (query?: ServiceStepsQuery | undefined): Promise<ServiceStepsResponse> {
    let next

    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)

      if (response.data.cursor?.next) {
        next = (): Promise<ServiceStepsResponse> => this.getAll({ uri: response.data.cursor.next })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count, cursor: response.data.cursor },
        next
      }
    } catch (error: any) {
      throw new ServiceStepsFetchAllFailed(error.message, { error })
    }
  }

  async meta (): Promise<ServiceStepsResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri('/meta')
      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) throw new ServiceStepsMetaFailed()

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new ServiceStepsMetaFailed(error.message, { error })
    }
  }

  async get (serviceStepId: string): Promise<ServiceStepResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${serviceStepId}`)
    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new ServiceStepFetchFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0] as ServiceStep,
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new ServiceStepFetchFailed(error.message, { error })
    }
  }

  async put (serviceStepId: string, serviceStep: ServiceStep): Promise<ServiceStepResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${serviceStepId}`)
    try {
      const response = await this.http.getClient().put(uri, serviceStep)

      return {
        data: response.data.results[0] as ServiceStep,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new ServiceStepPutFailed(error.message, { error })
    }
  }

  async create (serviceStep: ServiceStep): Promise<ServiceStepResponse> {
    const uri = this.uriHelper.generateBaseUri()
    try {
      const response = await this.http.getClient().post(uri, serviceStep)

      return {
        data: response.data.results[0] as ServiceStep,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new ServiceStepCreationFailed(error.message, { error })
    }
  }

  async delete (serviceStepId: string): Promise<ServiceStepResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${serviceStepId}`)
    try {
      const response = await this.http.getClient().delete(uri)
      if (response.status !== 200) throw new ServiceStepDeleteFailed()

      return {
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new ServiceStepDeleteFailed(error.message, { error })
    }
  }
}

export class ServiceStepsFetchAllFailed extends BaseError {
  public name = 'ServiceStepsFetchAllFailed'
  constructor (
    public message: string = 'Could not fetch all service steps',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ServiceStepsFetchAllFailed.prototype)
  }
}

export class ServiceStepsMetaFailed extends BaseError {
  public name = 'ServiceStepsMetaFailed'
  constructor (
    public message: string = 'Could not fetch service steps meta call',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ServiceStepsMetaFailed.prototype)
  }
}

export class ServiceStepFetchFailed extends BaseError {
  public name = 'ServiceStepFetchFailed'
  constructor (
    public message: string = 'Could not fetch the service step',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ServiceStepFetchFailed.prototype)
  }
}

export class ServiceStepPutFailed extends BaseError {
  public name = 'ServiceStepPutFailed'
  constructor (
    public message: string = 'Could not alter the service step',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ServiceStepPutFailed.prototype)
  }
}

export class ServiceStepCreationFailed extends BaseError {
  public name = 'ServiceStepCreationFailed'
  constructor (
    public message: string = 'Could not create the service step',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ServiceStepCreationFailed.prototype)
  }
}

export class ServiceStepDeleteFailed extends BaseError {
  public name = 'ServiceStepDeleteFailed'
  constructor (
    public message: string = 'Could not delete the service step',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ServiceStepDeleteFailed.prototype)
  }
}
