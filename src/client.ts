import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from 'axios'

import { environment } from './environment'

type Fn = () => any
type ResponseInterceptorFn = (error?: AxiosError) => any

export type Timeout = number | undefined

export interface ClientOptions {
  base?: string
  timeout?: Timeout
  headers?: {
    [key: string]: any
  }
  token?: string
  responseInterceptors?: ResponseInterceptorFn[]
  requestInterceptors?: Fn[]
}

const defaultHeaders = {
  'X-Client-Type': 'Tillhub SDK JavaScript',
  'X-Client-Version': environment.VERSION
}

/**
 * The Tillhub HTTP client is an axios instance that carries the state of of Authentication
 * in - if default headers have been set - has Authorization header.
 *
 * Since this class is a singleton we are destroying state internally through `.clearInstance()`.
 */
export class Client {
  private static instance: Client
  private readonly axiosInstance: AxiosInstance
  private responseInterceptorIds: number[] = []
  private requestInterceptorIds: number[] = []

  private constructor (options: ClientOptions) {
    this.axiosInstance = axios.create({
      // baseURL: options.base || 'https://api.tillhub.com',
      timeout: options.timeout ?? 10000,
      headers: {
        ...options.headers,
        ...defaultHeaders
      }
    })
  }

  static getInstance (options: ClientOptions): Client {
    // use headers in any case
    if (Client.instance) {
      Client.instance.setDefaults(options)
    }

    if (!Client.instance) {
      Client.instance = new Client(options)
      // ... any one time initialization goes here ...
    }

    return Client.instance
  }

  static clearInstance (): void {
    Client.instance.clearDefaults()
  }

  getClient (): AxiosInstance {
    return Client.instance.axiosInstance
  }

  setDefaults (options: ClientOptions): Client {
    Client.instance.axiosInstance.defaults.headers.common = {
      ...this.axiosInstance.defaults.headers.common,
      ...options.headers
    }

    Client.instance.axiosInstance.defaults.headers = {
      ...this.axiosInstance.defaults.headers,
      ...options.headers
    }

    // NOTE not sure if this is the correct place to inject the interceptors, but it's the most reliable
    if (options?.responseInterceptors?.length) {
      // remove previous interceptors
      this.responseInterceptorIds.forEach((id) =>
        Client.instance.axiosInstance.interceptors.response.eject(id)
      )

      this.responseInterceptorIds = options.responseInterceptors.map((interceptor: ResponseInterceptorFn) => {
        // Add success interceptor to include all headers
        return Client.instance.axiosInstance.interceptors.response.use(
          (response) => {
            // Include all headers in the response
            response.headers = {
              ...response.headers,
              ...Client.instance.axiosInstance.defaults.headers.common,
              ...Client.instance.axiosInstance.defaults.headers
            }
            return response
          },
          (error) => {
            // Include all headers in error response
            if (error.response) {
              const originalHeaders = { ...error.response.headers }
              error.response.headers = {
                ...originalHeaders,
                ...Client.instance.axiosInstance.defaults.headers.common,
                ...Client.instance.axiosInstance.defaults.headers
              }
              // Ensure www-authenticate header is preserved
              if (originalHeaders['Www-authenticate']) {
                error.response.headers['Www-authenticate'] = originalHeaders['Www-authenticate']
              }
            }
            return interceptor(error)
          }
        )
      })
    }

    if (options?.requestInterceptors?.length) {
      this.requestInterceptorIds.forEach((id) =>
        Client.instance.axiosInstance.interceptors.request.eject(id)
      )

      this.requestInterceptorIds = options.requestInterceptors.map((interceptor: Fn) => {
        return Client.instance.axiosInstance.interceptors.request.use(
          interceptor as (
            value: InternalAxiosRequestConfig
          ) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>
        )
      })
    }

    return Client.instance
  }

  clearDefaults (): void {
    delete Client.instance.axiosInstance.defaults.headers.common.Authorization
    delete Client.instance.axiosInstance.defaults.headers.Authorization
    delete Client.instance.axiosInstance.defaults.headers['x-whitelabel']
    Client.instance.axiosInstance.defaults.headers.common = {
      ...defaultHeaders
    }
  }
}
