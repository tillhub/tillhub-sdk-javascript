import { Client } from '../client'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'
import { BaseError } from '../errors'

export interface CustomerAppointmentsOptions {
  user?: string
  base?: string
}

export interface AppointmentCustomer {
  comment: string | null
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  source: string
}

export interface AppointmentLineItem {
  staffId: string
  serviceId: string
  serviceName: string
}

export type AppointmentStatus = 'NO_SHOW' | 'DECLINED_BY_MERCHANT' | 'CANCELED'

export interface AppointmentEntity {
  id?: string
  lineItems?: AppointmentLineItem[]
  customer?: AppointmentCustomer | null
  createdAt?: string
  updatedAt?: string
  status?: AppointmentStatus | null
  start?: string
  status_reason?: string
  notes?: string | null
}

export interface CustomerAppointmentsQueryHandler {
  query?: TransactionsQuery
  limit?: number
  uri?: string
}

export interface TransactionsQuery {
  deleted?: boolean
  when?: 'past' | 'future'
}

export interface CustomerAppointmentsResponse {
  data?: CustomerAppointments[]
  metadata?: Record<string, unknown>
  msg?: string
  next?: () => Promise<CustomerAppointmentsResponse>
}

export class CustomerAppointments extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/reservations/appointments'
  endpoint: string
  http: Client
  public options: CustomerAppointmentsOptions
  public uriHelper: UriHelper

  constructor (options: CustomerAppointmentsOptions, http: Client) {
    super(http, {
      endpoint: CustomerAppointments.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = CustomerAppointments.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (customerId: string, query?: CustomerAppointmentsQueryHandler): Promise<CustomerAppointmentsResponse> {
    let next
    const base = this.uriHelper.generateBaseUri(`/customers/${customerId}`)
    const uri = this.uriHelper.generateUriWithQuery(base, query)

    try {
      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) {
        throw new CustomerAppointmentsFetchFailed(undefined, { status: response.status })
      }

      if (response.data.cursors?.after) {
        next = (): Promise<CustomerAppointmentsResponse> =>
          this.getAll(customerId, { uri: response.data.cursors.after })
      }

      return {
        data: response.data.results,
        metadata: { cursor: response.data.cursors },
        next
      }
    } catch (error: any) {
      throw new CustomerAppointmentsFetchFailed(error.message, { error })
    }
  }
}

export class CustomerAppointmentsFetchFailed extends BaseError {
  public name = 'CustomerAppointmentsFetchFailed'
  constructor (
    public message: string = 'Could not fetch transactions',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, CustomerAppointmentsFetchFailed.prototype)
  }
}
