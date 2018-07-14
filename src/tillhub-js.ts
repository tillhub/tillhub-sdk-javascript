// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import 'core-js/fn/array.find'
import * as EventEmitter from 'events'
import { Auth, AuthOptions, AuthTypes, UsernameAuth, TokenAuth } from './v0/Auth'
import { Client, ClientOptions } from './Client'

import v0 from './v0'
import v1 from './v1'

export {
  v0,
  v1
}


export interface TillhubSDKOptions {
  user: string
  auth: UsernameAuth | TokenAuth
  endpoint: string
}

export class Tillhub extends EventEmitter {
  auth?: Auth
  client?: Client

  constructor(options?: TillhubSDKOptions) {
    super()

    if (!options) return this

    const authOptions: AuthOptions = {
      type: AuthTypes.username,
      credentials: options.auth
    }

    const clientOptions: ClientOptions = {
      endpoint: options.endpoint
    }

    this.client = Client.getInstance(clientOptions)
    this.auth = new v1.Auth(authOptions)
  }
}
