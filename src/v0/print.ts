import { Client } from '../client'
import { UriHelper } from '../uri-helper'

/* subclasses */
import { Jobs } from './print/jobs'
import { Messages } from './print/messages'
import { Printers } from './print/printers'

export interface PrintOptions {
  user?: string
  base?: string
}

export class Print {
  endpoint: string
  http: Client
  public options: PrintOptions
  public uriHelper: UriHelper

  constructor(options: PrintOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v0/print'
    this.options.base = this.options.base || 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  jobs(): Jobs {
    return new Jobs(this.options, this.http, this.uriHelper)
  }

  messages(): Messages {
    return new Messages(this.options, this.http, this.uriHelper)
  }

  printers(): Printers {
    return new Printers(this.options, this.http, this.uriHelper)
  }

  subscribeTo(eventName: string): EventSource {
    const base = this.uriHelper.generateBaseUri(`/events/${eventName}`)
    const uri = this.uriHelper.generateUriWithQuery(base)

    return new EventSource(uri)
  }
}
