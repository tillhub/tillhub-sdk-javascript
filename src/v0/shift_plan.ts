import { Client } from '../client'
import { UriHelper } from '../uri-helper'
import { BaseError } from '../errors/baseError'
import { ThBaseHandler } from '../base'

export interface ShiftPlanOptions {
  user?: string
  base?: string
}

export interface ShiftPlanResponse {
  msg?: string
  data?: ShiftPlanItem[]
  metadata?: Record<string, unknown>
}

export interface ShiftPlanShift {
  start: string
  end: string
}

export interface ShiftPlanItem {
  staff_member_id: string
  branch_id: string
  date: string
  plan: ShiftPlanShift[]
}

export interface ShiftPlanUpdateOptions {
  shifts: Array<{
    branch_id: string
    shift_plan: ShiftPlanItem[]
  }>
}

export class ShiftPlan extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/shift_plan'
  endpoint: string
  http: Client
  public options: ShiftPlanOptions
  public uriHelper: UriHelper

  constructor (options: ShiftPlanOptions, http: Client) {
    super(http, {
      endpoint: ShiftPlan.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = ShiftPlan.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (): Promise<ShiftPlanResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri()

      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) {
        throw new ShiftPlanFetchFailed(undefined, { status: response.status })
      }

      return {
        msg: response.data.msg,
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new ShiftPlanFetchFailed(error.message, { error })
    }
  }

  async put (shiftPlanOptions: ShiftPlanUpdateOptions): Promise<ShiftPlanResponse> {
    const uri = this.uriHelper.generateBaseUri()

    try {
      const response = await this.http.getClient().put(uri, shiftPlanOptions)

      return {
        data: response.data.results as ShiftPlanItem[],
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new ShiftPlanPutFailed(error.message, { error })
    }
  }
}

class ShiftPlanFetchFailed extends BaseError {
  public name = 'ShiftPlanFetchFailed'
  constructor (
    public message: string = 'Could not fetch ShiftPlan',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ShiftPlanFetchFailed.prototype)
  }
}

export class ShiftPlanPutFailed extends BaseError {
  public name = 'ShiftPlanPutFailed'
  constructor (
    public message: string = 'Could not alter the shift plan',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ShiftPlanPutFailed.prototype)
  }
}
