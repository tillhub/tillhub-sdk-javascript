import qs from 'qs'
import { Client } from '../client'

export interface ThBaseHandlerOptions {
  endpoint: string
  base: string
}

export interface HandlerQuery {
  uri?: string
  limit?: number
  offset?: number
  query?: any
  [key: string]: any
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

// export interface ThAnalyticsBaseHandlerJsonReponseItem {
//   created_at: {
//     iso: string
//     unix: number
//   },
//   metric: {
//     job: string,
//     user: string
//   }
//   count: number
//   results: any[]
// }

// export interface ThAnalyticsBaseResponse {
//   data: object[]
//   metadata: {
//     count: number
//     total_count: number
//   }
//   msg?: string
// }

export interface ThAnalyticsBaseResultItem {
  created_at: {
    iso: string
    unix: number
  }
  metric: {
    job: string
    user: string
    type?: string
  }
  count: number
  values: Record<string, unknown>[]
}

export interface ThAnalyticsBaseResponse {
  results: ThAnalyticsBaseResultItem[]
  status: number
  next?: string
}

export interface ThAnalyticsExportsBaseResponse {
  url: string
  filename?: string
  expires_at?: string
}

export class ThAnalyticsBaseHandler {
  private handlerOptions: ThAnalyticsBaseHandlerOptions
  private client: Client

  constructor(http: Client, handlerOptions: ThAnalyticsBaseHandlerOptions) {
    this.client = http
    this.handlerOptions = handlerOptions
  }

  protected static generateAuthenticatedInstance<T>(
    type: { new (options: ThAnalyticsBaseHandlerOptions, http: Client): T },
    options: ThAnalyticsBaseHandlerOptions,
    http: Client
  ): T {
    return new type(options, http)
  }

  private static generateUriWithQuery(basePath: string, query?: HandlerQuery): string {
    let uri
    if (!query) {
      uri = `${basePath}`
    } else if (query.uri || (query.query && query.query.uri)) {
      uri = query.uri || query.query.uri
    } else if (query.query) {
      const flattenedQuery = Object.assign({}, query, query.query)
      flattenedQuery.query = undefined
      uri = `${basePath}${
        flattenedQuery ? qs.stringify(flattenedQuery, { addQueryPrefix: true }) : ''
      }`
    } else {
      uri = `${basePath}${query ? qs.stringify(query, { addQueryPrefix: true }) : ''}`
    }
    return uri
  }

  protected async handleGet(
    url: string,
    query?: HandlerQuery,
    requestOptions?: any
  ): Promise<ThAnalyticsBaseResponse> {
    const opts = {
      method: 'GET',
      url: ThAnalyticsBaseHandler.generateUriWithQuery(url, query),
      ...requestOptions
    }
    const response = await this.client.getClient()(opts)

    return {
      status: response.status,
      next:
        response.data.cursor && response.data.cursor.next ? response.data.cursor.next : undefined,
      results: response.data.results
    } as ThAnalyticsBaseResponse
  }

  protected async handleExport(
    url: string,
    query?: HandlerQuery,
    requestOptions?: any
  ): Promise<ThAnalyticsExportsBaseResponse> {
    const opts = {
      method: 'GET',
      url: ThAnalyticsBaseHandler.generateUriWithQuery(url, query),
      ...requestOptions
    }
    const response = await this.client.getClient()(opts)

    return {
      ...response.data.results[0]
    } as ThAnalyticsExportsBaseResponse
  }
}
