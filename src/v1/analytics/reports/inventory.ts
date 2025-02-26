import {
  ThAnalyticsBaseHandler,
  ThAnalyticsBaseResultItem,
  ThAnalyticsExportsBaseResponse
} from '../../../base'
import { Client } from '../../../client'
import { BaseError } from '../../../errors'
import { UriHelper } from '../../../uri-helper'
import { AnalyticsOptions } from '../../../v0/analytics'

export interface AnalyticsReportsInventoryResponseItem {
  data: Array<Record<string, unknown>>
  summary: Array<Record<string, unknown>>
  metadata: {
    count?: number
    total_count?: number
  }
  next?: () => Promise<AnalyticsReportsInventoryResponseItem>
}

export type AnalyticsReportsInventoryExportResponseItem = ThAnalyticsExportsBaseResponse

export class AnalyticsReportsInventory extends ThAnalyticsBaseHandler {
  http: Client
  public options: AnalyticsOptions
  public timeout: AnalyticsOptions['timeout']

  constructor (options: AnalyticsOptions, http: Client) {
    super(http, options)
    this.options = options
    this.http = http
    this.timeout = options.timeout ?? this.http.getClient().defaults.timeout
  }

  static create (options: Record<string, unknown>, http: Client): AnalyticsReportsInventory {
    return ThAnalyticsBaseHandler.generateAuthenticatedInstance(
      AnalyticsReportsInventory,
      options,
      http
    )
  }

  public async getAll (
    query?: Record<string, unknown>
  ): Promise<AnalyticsReportsInventoryResponseItem> {
    try {
      let nextFn
      const localUriHelper = new UriHelper('/api/v1/analytics', this.options)
      const uri = localUriHelper.generateBaseUri('/reports/inventory')
      const { results: d, next } = await this.handleGet(uri, query, { timeout: this.timeout })

      if (!d) {
        throw new TypeError('Unexpectedly did not return data.')
      }

      const data = d?.find(
        (item: ThAnalyticsBaseResultItem) => item.metric.job === 'reports_inventory'
      )?.values ?? []

      const summary = d?.find(
        (item: ThAnalyticsBaseResultItem) => item.metric.job === 'reports_inventory_summary'
      )?.values ?? []

      const count = d?.find(
        (item: ThAnalyticsBaseResultItem) =>
          item.metric.job === 'reports_inventory_filtered_meta'
      )?.values[0] ?? {}

      if (next) {
        nextFn = (): Promise<AnalyticsReportsInventoryResponseItem> =>
          this.getAll({ uri: next })
      }
     
      let output = {
        data: data,
        summary: summary,
        metadata: count,
        next: nextFn
      }
      console.log('output: ', output);
      return output
    } catch (error: any) {
      throw new AnalyticsReportsInventoryFetchError(error.message, { error })
    }
  }

}

export class AnalyticsReportsInventoryFetchError extends BaseError {
  public name = 'AnalyticsReportsInventoryFetchError'
  constructor (
    public message: string = 'Could not fetch inventory items. ',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AnalyticsReportsInventoryFetchError.prototype)
  }
}

export class AnalyticsReportsInventoryExportFetchError extends BaseError {
  public name = 'AnalyticsReportsInventoryExportFetchError'
  constructor (
    public message: string = 'Could not fetch inventory export. ',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AnalyticsReportsInventoryExportFetchError.prototype)
  }
}
