import { Client } from '../../client'
import { UriHelper } from '../../uri-helper'
import * as errors from '../../errors'
import { PrintOptions } from '../print'

export interface PrintJob {
  id?: string
  data?: string
  printer?: string
  type?: string
  options?: object
  amount?: number
  status?: string
  status_message?: string
}

export interface PrintJobsResponse {
  data: PrintJob[]
  metadata: object
  msg?: string
}

export interface PrintJobResponse {
  data: PrintJob
  metadata: object
  msg?: string
}

export interface PrintJobDataResponse {
  data: string // text string or base64 pdf
  msg?: string
}

export class Jobs {
  http: Client
  public options: PrintOptions
  public uriHelper: UriHelper

  constructor(options: PrintOptions, http: Client, uriHelper: UriHelper) {
    this.options = options
    this.http = http
    this.uriHelper = uriHelper
  }

  async getAll(query?: Object): Promise<PrintJobsResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/jobs')
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new errors.PrintJobsFetchFailed()

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      } as PrintJobsResponse
    } catch (e) {
      throw new errors.PrintJobsFetchFailed()
    }
  }

  async get(jobId: string): Promise<PrintJobResponse> {
    try {
      const base = this.uriHelper.generateBaseUri(`/jobs/${jobId}`)
      const uri = this.uriHelper.generateUriWithQuery(base)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new errors.PrintJobFetchFailed()

      return {
        data: response.data.results[0] as PrintJob,
        metadata: { count: response.data.count },
        msg: response.data.msg
      } as PrintJobResponse
    } catch (e) {
      throw new errors.PrintJobFetchFailed()
    }
  }

  async create(job: Object, query?: Object): Promise<PrintJobResponse> {
    try {
      const base = this.uriHelper.generateBaseUri(`/jobs`)
      const uri = this.uriHelper.generateUriWithQuery(base, query)
      const response = await this.http.getClient().post(uri, job)
      if (response.status !== 200) throw new errors.PrintJobCreateFailed()

      return {
        data: response.data.results[0] as PrintJob,
        metadata: { count: response.data.count }
      } as PrintJobResponse
    } catch (e) {
      throw new errors.PrintJobCreateFailed()
    }
  }

  async update(jobId: string, job: Object): Promise<PrintJobResponse> {
    try {
      const base = this.uriHelper.generateBaseUri(`/jobs/${jobId}`)
      const uri = this.uriHelper.generateUriWithQuery(base)

      const response = await this.http.getClient().patch(uri, job)
      if (response.status !== 200) throw new errors.PrintJobUpdateFailed()

      return {
        data: response.data.results[0] as PrintJob,
        metadata: { count: response.data.count }
      } as PrintJobResponse
    } catch (e) {
      throw new errors.PrintJobUpdateFailed()
    }
  }

  async delete(jobId: string): Promise<PrintJobResponse> {
    try {
      const base = this.uriHelper.generateBaseUri(`/jobs/${jobId}`)
      const uri = this.uriHelper.generateUriWithQuery(base)

      const response = await this.http.getClient().delete(uri)
      if (response.status !== 200) throw new errors.PrintJobDeleteFailed()

      return {
        msg: response.data.msg
      } as PrintJobResponse
    } catch (e) {
      throw new errors.PrintJobDeleteFailed()
    }
  }

  async getData(jobId: string): Promise<PrintJobDataResponse> {
    try {
      const base = this.uriHelper.generateBaseUri(`/jobs/${jobId}/data`)
      const uri = this.uriHelper.generateUriWithQuery(base)
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new errors.PrintJobDataFetchFailed()

      return {
        data: response.data.results[0],
        msg: response.data.msg
      } as PrintJobDataResponse
    } catch (e) {
      throw new errors.PrintJobDataFetchFailed()
    }
  }
}
