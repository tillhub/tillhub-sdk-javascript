import qs from 'qs'
import { Client } from '../client'

export interface ThBaseHandlerOptions {
  endpoint: string
  base: string
}

export class ThBaseHandler {
  private handlerOptions: ThBaseHandlerOptions
  private client: Client

  constructor(http: Client, handlerOptions: ThBaseHandlerOptions) {
    this.client = http
    this.handlerOptions = handlerOptions
  }
}

export interface ThAnalyticsBaseHandlerOptions {
  user?: string
  base?: string
}

export interface ThAnalyticsBaseHandlerJsonReponseItem {
  created_at: {
    iso: string
    unix: number
  },
  metric: {
    job: string,
    user: string
  }
  count: number
  results: any[]
}

export class ThAnalyticsBaseHandler {
  private handlerOptions: ThAnalyticsBaseHandlerOptions
  private client: Client

  constructor(http: Client, handlerOptions: ThAnalyticsBaseHandlerOptions) {
    this.client = http
    this.handlerOptions = handlerOptions
  }

  protected static generateAuthenticatedInstance<T>(
    type: { new(options: object, http: Client): T },
    options: ThAnalyticsBaseHandlerOptions,
    http: Client
  ): T {
    return new type(
      options,
      http
    )
  }

  protected async handleGet(url: string, query?: object, requestOptions?: object): Promise<ThAnalyticsBaseHandlerJsonReponseItem[]> {
    const opts = {
      method: 'GET',
      url: `${url}${query ? qs.stringify(query, { addQueryPrefix: true }) : ''}`,
      ...requestOptions
    }
    const response = await this.client.getClient()(opts)

    return response.data.results as ThAnalyticsBaseHandlerJsonReponseItem[]
  }
}
