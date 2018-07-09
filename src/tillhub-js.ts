// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import 'core-js/fn/array.find'
import EventEmitter from 'events'
import { Auth, AuthOptions, AuthTypes, PasswordAuth, TokenAuth } from './Auth'
import { Client, ClientOptions } from './Client'

export interface TillhubSDKOptions {
  user: string
  auth: PasswordAuth | TokenAuth
  endpoint: string
}

export default class Tillhub extends EventEmitter {
  auth?: Auth
  client?: Client

  constructor(options: TillhubSDKOptions) {
    super()

    if (!options) return this

    const authOptions: AuthOptions = {
      type: AuthTypes.password,
      data: options.auth
    }
    const clientOptions: ClientOptions = {
      endpoint: options.endpoint
    }

    this.client = Client.getInstance(clientOptions)
    this.auth = new Auth(authOptions, this.client)
  }
}
