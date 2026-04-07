
import { Client } from '../client'
import { BaseError } from '../errors/baseError'
import { ThBaseHandler } from '../base'

export interface IamBackupCodesOptions {
  user?: string
  base?: string
}

export interface IamBackupCodesVerify2faResponse {
  success: boolean
}

export class IamBackupCodes extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/iam/backup-codes'
  http: Client
  public options: IamBackupCodesOptions
  endpoint: string

  constructor (options: IamBackupCodesOptions, http: Client) {
    super(http, {
      endpoint: IamBackupCodes.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = IamBackupCodes.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
  }

  async verify2fa (tenantId: string): Promise<IamBackupCodesVerify2faResponse> {
    const base = this.options.base ?? 'https://api.tillhub.com'
    const uri = `${base}${this.endpoint}/${tenantId}`

    try {
      const response = await this.http.getClient().post(uri)

      if (response.status !== 200) {
        throw new IamBackupCodesVerify2faFailed(undefined, { status: response.status })
      }
      return {
        success: response.data.success ?? true
      }
    } catch (error: any) {
      throw new IamBackupCodesVerify2faFailed(error.message, { error })
    }
  }
}

export class IamBackupCodesVerify2faFailed extends BaseError {
  public name = 'IamBackupCodesVerify2faFailed'
  constructor (
    public message: string = 'Could not verify 2fa for backup codes',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, IamBackupCodesVerify2faFailed.prototype)
  }
}
