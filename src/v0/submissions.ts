import { Client } from '../client'
import { UriHelper } from '../uri-helper'
import { BaseError } from '../errors/baseError'
import { ThBaseHandler } from '../base'
import { Taxpayer } from './taxpayer'

export interface SubmissionsOptions {
  user?: string
  base?: string
}

export interface SubmissionsOverviewQuery {
  limit?: number
  offset?: number
  uri?: string
  query?: {
    deleted?: boolean
    location?: string
  }
}

export interface SubmissionsOverviewResponse {
  msg?: string
  data?: Branch[]
  metadata?: Record<string, unknown>
  next?: () => Promise<SubmissionsOverviewResponse>
}

export interface Branch {
  id?: string
  name?: string
  location?: string
  active?: boolean
  deleted?: boolean
  latest_submission?: Submission | null
}

export enum SubmissionRegisterStatus {
  Unchanged = 'UNCHANGED',
  New = 'NEW',
  Updated = 'UPDATED',
  Decommissioned = 'DECOMMISSIONED'
}

export interface SubmissionRegister {
  id?: string
  registerId?: string
  createdAt?: string
  updatedAt?: string
  active?: boolean
  deleted?: boolean
  deletedAt?: string | null
  name?: string
  registerNumber?: string
  manufacturer?: string
  model?: string
  software?: string
  clientType?: string
  tssId?: string
  clientId?: string
  status?: SubmissionRegisterStatus
}

export enum SubmissionStatus {
  Draft = 'DRAFT',
  Ongoing = 'ONGOING',
  Submitted = 'SUBMITTED',
  Failed = 'FAILED',
  Cancelled = 'CANCELLED'
}

export interface Submission {
  id?: string
  createdAt?: string
  updatedAt?: string
  deletedAt?: string | null
  fiskalySubmissionId?: string | null
  branchId?: string
  active?: boolean
  status?: SubmissionStatus
  registers?: SubmissionRegister[]
  submittedAt?: string | null
}

export interface SubmissionResponse {
  msg?: string
  data?: Submission
  metadata?: Record<string, unknown>
}

export interface SubmissionPdfResponse extends Blob {}

export class Submissions extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/submissions'
  endpoint: string
  http: Client
  public options: SubmissionsOptions
  public uriHelper: UriHelper

  constructor (options: SubmissionsOptions, http: Client) {
    super(http, {
      endpoint: Submissions.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = Submissions.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getOverview (
    queryOrOptions?: SubmissionsOverviewQuery | undefined
  ): Promise<SubmissionsOverviewResponse> {
    try {
      let next
      const base = this.uriHelper.generateBaseUri('/submissions/overview')
      const uri = this.uriHelper.generateUriWithQuery(base, queryOrOptions)

      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) {
        throw new SubmissionsGetOverviewFailed(undefined, { status: response.status })
      }

      if (response.data.cursors?.after) {
        next = (): Promise<SubmissionsOverviewResponse> =>
          this.getOverview({ uri: response.data.cursors.after })
      }

      return {
        msg: response.data.msg,
        data: response.data.results,
        metadata: { count: response.data.count },
        next
      }
    } catch (error: any) {
      throw new SubmissionsGetOverviewFailed(error.message, { error })
    }
  }

  async getCurrent (branchId: string): Promise<SubmissionResponse> {
    const uri = this.uriHelper.generateBaseUri(`/branches/${branchId}/submissions/current`)
    try {
      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) {
        throw new SubmissionsGetCurrentFailed(undefined, { status: response.status })
      }

      return {
        msg: response.data.msg,
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new SubmissionsGetCurrentFailed(error.message, { error })
    }
  }

  async create (branchId: string, submissionId: string): Promise<SubmissionResponse> {
    const uri = this.uriHelper.generateBaseUri(
      `/branches/${branchId}/submissions/${submissionId}/create`
    )
    try {
      const response = await this.http.getClient().put(uri)

      if (response.status !== 200) {
        throw new SubmissionCreateFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0] as Submission,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new SubmissionCreateFailed(error.message, { error })
    }
  }

  async trigger (branchId: string, submissionId: string): Promise<SubmissionResponse> {
    const uri = this.uriHelper.generateBaseUri(
      `/branches/${branchId}/submissions/${submissionId}/trigger`
    )

    try {
      const response = await this.http.getClient().put(uri)

      if (response.status !== 200) {
        throw new SubmissionTriggerFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0] as Submission,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new SubmissionTriggerFailed(error.message, { error })
    }
  }

  async getPreviewPdf (branchId: string, submissionId: string): Promise<SubmissionPdfResponse> {
    const uri = this.uriHelper.generateBaseUri(
      `/branches/${branchId}/submissions/${submissionId}/preview`
    )
    try {
      const { data } = await this.http.getClient().get(uri, {
        responseType: 'blob'
      })

      return data
    } catch (error: any) {
      throw new SubmissionsGetPreviewPdfFailed(error.message, { error })
    }
  }

  async getPdf (branchId: string, submissionId: string): Promise<SubmissionPdfResponse> {
    const uri = this.uriHelper.generateBaseUri(
      `/branches/${branchId}/submissions/${submissionId}/download`
    )
    try {
      const { data } = await this.http.getClient().get(uri, {
        responseType: 'blob'
      })

      return data
    } catch (error: any) {
      throw new SubmissionsGetPdfFailed(error.message, { error })
    }
  }

  taxpayer (): Taxpayer {
    return new Taxpayer(this.options, this.http, this.uriHelper)
  }
}

class SubmissionsGetOverviewFailed extends BaseError {
  public name = 'SubmissionsGetOverviewFailed'
  constructor (
    public message: string = 'Could not fetch submissions overview',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, SubmissionsGetOverviewFailed.prototype)
  }
}

class SubmissionCreateFailed extends BaseError {
  public name = 'SubmissionCreateFailed'
  constructor (
    public message: string = 'Could not create submission',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, SubmissionCreateFailed.prototype)
  }
}

class SubmissionTriggerFailed extends BaseError {
  public name = 'SubmissionTriggerFailed'
  constructor (
    public message: string = 'Could not trigger submission',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, SubmissionTriggerFailed.prototype)
  }
}

class SubmissionsGetCurrentFailed extends BaseError {
  public name = 'SubmissionsGetCurrentFailed'
  constructor (
    public message: string = 'Could not fetch current submission for branch',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, SubmissionsGetCurrentFailed.prototype)
  }
}

class SubmissionsGetPreviewPdfFailed extends BaseError {
  public name = 'SubmissionsGetPreviewPdfFailed'
  constructor (
    public message: string = 'Could not fetch submission preview pdf',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, SubmissionsGetPreviewPdfFailed.prototype)
  }
}

class SubmissionsGetPdfFailed extends BaseError {
  public name = 'SubmissionsGetPdfFailed'
  constructor (
    public message: string = 'Could not fetch submission pdf',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, SubmissionsGetPdfFailed.prototype)
  }
}
