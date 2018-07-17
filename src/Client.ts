import axios, { AxiosRequestConfig, AxiosPromise, AxiosInstance } from 'axios'

export interface ClientOptions {
  base: string
  timeout?: number
  headers?: object
  token?: string
}

export class Client {
  private static instance: Client
  private axiosInstance: AxiosInstance

  private constructor(options: ClientOptions) {
    this.axiosInstance = axios.create({
      baseURL: options.base,
      timeout: options.timeout || 10000,
      headers: {
        ...options.headers,
        'X-Client-Type': 'Tillhub SDk JavaScript'
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

  getClient(): AxiosInstance {
    return this.axiosInstance
  }
}
