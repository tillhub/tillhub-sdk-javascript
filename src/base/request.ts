import { Client } from '../client'

export class ThBaseRequest {
  private client: Client
  constructor(http: Client) {
    this.client = http
  }
}
