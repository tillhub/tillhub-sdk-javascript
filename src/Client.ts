import axios from 'axios'

export interface ClientOptions {
  endpoint: string
  timeout?: number
  headers?: object
}

export default class Client {
  private static instance: Client
  private axiosInstance: object

  private constructor(options: ClientOptions) {
    this.axiosInstance = axios.create({
      baseURL: options.endpoint,
      timeout: options.timeout || 10000,
      headers: {
        ...options.headers,
        'X-Client-Type': 'foobar'
      }
    })
  }

  static getInstance(options: ClientOptions) {
    if (!Client.instance) {
      Client.instance = new Client(options)
      // ... any one time initialization goes here ...
    }

    return Client.instance
  }

  getClient(): object {
    return this.axiosInstance
  }
}
