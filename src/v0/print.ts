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

  /**
   * Returns an EventSource instance as an endpoint to receive events for the given event name.
   * Subscription state and event handling can be handled via setting `onmessage`, `onopen`, and `onerror` callbacks on the EventSource instance.
   * @param {string} eventName - name of the event to subscribe to (e.g. `jobs`, `messages`, `printers`)
   * @param {Object} [query] - query Record<string, unknown>
   * @returns {EventSource} - event source notifying of server-sent events
   */
  subscribeTo(eventName: string, query?: Object): EventSource {
    const base = this.uriHelper.generateBaseUri(`/events/${eventName}`)
    const uri = this.uriHelper.generateUriWithQuery(base, query)

    return new EventSource(uri)
  }
}
