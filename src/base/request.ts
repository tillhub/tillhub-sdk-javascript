import { Client } from '../client'

export class ThBaseRequest {
  private readonly client: Client
  constructor (http: Client) {
    this.client = http
  }
}
