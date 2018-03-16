import axios from 'axios'
import * as errors from './Errors'

export enum AuthTypes {
  password = 1,
  token
}

export interface AuthOptions {
  type: AuthTypes
}

export default class Auth {
  authenticated: boolean = false
  public options: AuthOptions

  constructor(options: AuthOptions) {
    this.options = options
  }

  async loginWithPassword(
    user: string,
    password: string
  ): Promise<[errors.AuthenticationFailed | null, object | null]> {
    try {
      const response = await axios.post('/user?ID=12345', {
        user: user,
        password: password
      })
      return [null, response]
    } catch (error) {
      return [error, null]
    }
  }
}
