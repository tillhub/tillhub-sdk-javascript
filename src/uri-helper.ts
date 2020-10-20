import qs from 'qs'

export interface HandlerOption {
  user?: string
  base?: string
}

export interface HandlerQuery {
  uri?: string
  limit?: number
  offset?: number
  query?: any
  [key: string]: any
}

export class UriHelper {
  public baseUri: string

  constructor (endpoint: string, options: HandlerOption) {
    const base = options.base ?? 'https://api.tillhub.com'
    const user = options.user ? `/${options.user}` : ''
    this.baseUri = `${base}${endpoint}${user}`
  }

  public generateBaseUri (path?: string): string {
    const additionalPath = path ?? ''
    return `${this.baseUri}${additionalPath}`
  }

  public generateUriWithQuery (basePath: string, query?: HandlerQuery): string {
    if (!query) return `${basePath}`

    if (query.uri ?? (query?.query?.uri)) {
      return query.uri ?? query.query.uri
    }

    if (query.query) {
      const flattenQuery = { ...query, ...query.query }
      delete flattenQuery.query
      return `${basePath}${qs.stringify(flattenQuery, { addQueryPrefix: true })}`
    }

    return `${basePath}${qs.stringify(query, { addQueryPrefix: true })}`
  }
}
