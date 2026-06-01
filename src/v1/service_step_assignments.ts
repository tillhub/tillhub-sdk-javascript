import { Client } from '../client'
import { UriHelper } from '../uri-helper'
import { BaseError } from '../errors/baseError'

export interface ServiceStepAssignmentsOptions {
  user?: string
  base?: string
}

export interface ServiceStepAssignmentsResponse {
  data: ServiceStepAssignment[]
  metadata: {
    count?: number
  }
}

export type ServiceStepAssignmentType = 'active' | 'idle'

export interface ServiceStepSummary {
  id: string
  name: string
  duration: number
}

export interface ServiceStepAssignment {
  id?: string
  position: number
  type: ServiceStepAssignmentType
  duration: number
  step?: ServiceStepSummary
  bookableOnline?: boolean | null
}

export interface ServiceStepAssignmentBody {
  id?: string
  type: ServiceStepAssignmentType
  duration: number
  stepId?: string
  bookableOnline?: boolean | null
}

export type ServiceStepAssignmentsRequest = ServiceStepAssignmentBody[]

export class ServiceStepAssignments {
  public static baseEndpoint = '/api/v1/services'
  http: Client
  public options: ServiceStepAssignmentsOptions
  public uriHelper: UriHelper

  constructor (options: ServiceStepAssignmentsOptions, http: Client) {
    this.options = options
    this.http = http
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(ServiceStepAssignments.baseEndpoint, this.options)
  }

  async getAll (serviceId: string): Promise<ServiceStepAssignmentsResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${serviceId}/steps`)
    try {
      const response = await this.http.getClient().get(uri)

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new ServiceStepAssignmentsFetchAllFailed(error.message, { error })
    }
  }

  async put (
    serviceId: string,
    serviceStepAssignments: ServiceStepAssignmentsRequest
  ): Promise<ServiceStepAssignmentsResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${serviceId}/steps`)
    try {
      const response = await this.http.getClient().put(uri, serviceStepAssignments)

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new ServiceStepAssignmentsPutFailed(error.message, { error })
    }
  }
}

export class ServiceStepAssignmentsFetchAllFailed extends BaseError {
  public name = 'ServiceStepAssignmentsFetchAllFailed'
  constructor (
    public message: string = 'Could not fetch all service step assignments',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ServiceStepAssignmentsFetchAllFailed.prototype)
  }
}

export class ServiceStepAssignmentsPutFailed extends BaseError {
  public name = 'ServiceStepAssignmentsPutFailed'
  constructor (
    public message: string = 'Could not alter the service step assignments',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ServiceStepAssignmentsPutFailed.prototype)
  }
}
