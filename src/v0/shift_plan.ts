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
  data?: ShiftPlan
  metadata?: Record<string, unknown>
}

export interface Shift {
  start: string
  end: string
}

export interface ShiftPlanItem {
  staff_member_id: string
  date: string
  plan: Shift[]
}

export interface ShiftPlan {
  shift_plan_enabled: boolean
  plan: ShiftPlanItem[]
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

  async get (branchId: string): Promise<ShiftPlanResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri(`/${branchId}`)

      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) {
        throw new ShiftPlanFetchFailed(undefined, { status: response.status })
      }

      return {
        msg: response.data.msg,
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new ShiftPlanFetchFailed(error.message, { error })
    }
  }

  async put (branchId: string, shiftPlan: ShiftPlan): Promise<ShiftPlanResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${branchId}`)

    try {
      const response = await this.http.getClient().put(uri, shiftPlan)

      return {
        data: response.data.results[0] as ShiftPlan,
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
