// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import 'core-js/fn/array.find'
import * as EventEmitter from 'events'
import { AuthResponse, AuthOptions, AuthTypes, UsernameAuth, TokenAuth } from './v0/Auth'
import { Auth } from './v1/Auth'
import { Transactions } from './v0/Transactions'
import { Client, ClientOptions } from './Client'
import * as errors from './Errors'

import v0 from './v0'
import v1 from './v1'

export { v0, v1 }

export interface TillhubSDKOptions {
  credentials: UsernameAuth | TokenAuth
  base?: string
}

export class Tillhub extends EventEmitter {
  user?: string
  auth: Auth
  http?: Client

  constructor(options: TillhubSDKOptions) {
    super()

    const authOptions: AuthOptions = {
      type: AuthTypes.username,
      credentials: options.credentials
    }

    // const clientOptions: ClientOptions = {
    //   base: options.base || 'https://api.tillhub.com'
    // }

    // this.client = Client.getInstance(clientOptions)
    this.auth = new v1.Auth(authOptions)
  }

  /**
   * Initialise the SDK instance by authenticating the client
   *
   */
  async init(): Promise<errors.AuthenticationFailed | Auth> {
    try {
      const [authErr, authResponse] = await this.auth.authenticate()
      if (authErr) throw authErr

      if (authResponse) {
        this.user = authResponse.user
        this.http = Client.getInstance({
          headers: {
            Authorization: authResponse.token,
            'X-Client-ID': authResponse.user
          }
        } as ClientOptions)
        return this.auth
      }

      throw new errors.AuthenticationFailed()
    } catch (err) {
      throw err
    }
  }

  /**
   * Create an authenticated transactions instance
   *
   */
  transactions(): Transactions {
    return new Transactions()
  }
}
