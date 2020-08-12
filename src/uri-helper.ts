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

  constructor(endpoint: string, options: HandlerOption) {
    const base = options.base || 'https://api.tillhub.com'
    const user = options.user ? `/${options.user}` : ''
    this.baseUri = `${base}${endpoint}${user}`
  }

  public generateBaseUri(path?: string): string {
    const additionalPath = path || ''
    return `${this.baseUri}${additionalPath}`
  }

  public generateUriWithQuery(basePath: string, query?: HandlerQuery): string {
    let uri
    if (!query) {
      uri = `${basePath}`
    } else if (query.uri || (query.query && query.query.uri)) {
      uri = query.uri || query.query.uri
    } else if (query.query) {
      const flattenQuery = { ...query, ...query.query }
      delete flattenQuery.query
      uri = `${basePath}?${qs.stringify(flattenQuery)}`
    } else {
      uri = `${basePath}?${qs.stringify(query)}`
    }
    return uri
  }
}
