import { Client } from '../client'

export interface ThBaseHandlerOptions {
  endpoint: string
  base: string
}

export class ThBaseHandler {
  private handlerOptions: ThBaseHandlerOptions
  private client: Client

  constructor(http: Client, handlerOptions: ThBaseHandlerOptions) {
    this.client = http
    this.handlerOptions = handlerOptions
  }
}
