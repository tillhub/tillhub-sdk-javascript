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
  metaData: {
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
      const localUriHelper = new UriHelper('/api/v2/analytics', this.options)
      const uri = localUriHelper.generateBaseUri('/reports/inventory')
      const { results: d, next } = await this.handleGet(uri, query, { timeout: this.timeout })

      if (!d) {
        throw new TypeError('Unexpectedly did not return data.')
      }

      const data = d?.find(
        (item: ThAnalyticsBaseResultItem) => item.metric.job === 'reports_inventory_items_v2_data'
      )?.values ?? []

      const summary = d?.find(
        (item: ThAnalyticsBaseResultItem) => item.metric.job === 'reports_inventory_items_v2_summary'
      )?.values ?? []

      if (next) {
        nextFn = (): Promise<AnalyticsReportsInventoryResponseItem> =>
          this.getAll({ uri: next })
      }

      return {
        data: data,
        summary: summary,
        metaData: {},
        next: nextFn
      }
    } catch (error: any) {
      throw new AnalyticsReportsInventoryFetchError(error.message, { error })
    }
  }

  public async export (
    query?: Record<string, unknown>
  ): Promise<AnalyticsReportsInventoryExportResponseItem> {
    try {
      const localUriHelper = new UriHelper('/api/v2/analytics', this.options)
      const uri = localUriHelper.generateBaseUri('/reports/inventory')
      const result = await this.handleExport(uri, query)

      return result
    } catch (error: any) {
      throw new AnalyticsReportsInventoryExportFetchError(error.message, { error })
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
