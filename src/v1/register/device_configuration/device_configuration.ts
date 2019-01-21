import { Client } from '../../../client'
import * as errors from '../../../errors'
import { RegisterOptions, RegisterResponse } from '../register'

export interface DeviceConfigurationObject {
  device_token: string
  bundle_id: string
  network?: { ip: string }
}

export class DeviceConfiguration {
  registerId: string
  endpoint: string
  http: Client
  public options: RegisterOptions

  constructor(registerId: string, options: RegisterOptions, http: Client) {
    this.registerId = registerId
    this.options = options
    this.http = http

    this.endpoint = `/api/v1/Registers`
    this.options.base = this.options.base || 'https://api.tillhub.com'
  }

  async update(deviceConfiguration: DeviceConfigurationObject): Promise<RegisterResponse> {
    try {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${this.registerId}/device_configuration`

      const response = await this.http.getClient().put(uri, deviceConfiguration)
      return {
        data: response.data.results[0]
      } as RegisterResponse
    } catch (error) {
      console.warn(error)
      throw new errors.RegisterDeviceConfigurationPutFailed(undefined, { error })
    }
  }
}
