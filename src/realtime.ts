import { connect, MqttClient } from 'mqtt'
import events from 'events'

interface RealtimeOptions {
  endpoint?: string
}

export default class Realtime extends events.EventEmitter {
  private initialized = false
  private connected = false
  private readonly client?: MqttClient
  public options: RealtimeOptions

  constructor (options?: RealtimeOptions) {
    super()

    this.options = {
      endpoint: 'wss://wss.tillhub.com',
      ...options
    }

    this.client = connect(this.options.endpoint)
    this.initialized = true

    this.client.on('connect', () => {
      this.connected = true
    })
    this.client.on('close', () => {
      this.connected = false
    })
  }

  isInitialized (): boolean {
    return this.initialized
  }

  isConnected (): boolean {
    return this.connected
  }

  destroy (): void {
    if (!this.client) { throw new Error('cannot destroy instance, because a client is not initialized') }

    this.client.end()
    this.initialized = false
  }
}
