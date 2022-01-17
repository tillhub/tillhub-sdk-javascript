import { Client } from '../../client'
import { UriHelper } from '../../uri-helper'
import * as errors from '../../errors'
import { PrintOptions } from '../print'

export interface Printer {
  id?: string
  name?: string
  status?: string
  driver_options?: string
  types?: string
  is_default?: boolean
}

export interface PrintersResponse {
  data?: Printer[]
  metadata?: Record<string, unknown>
  msg?: string
}

export interface PrinterResponse {
  data?: Printer
  metadata?: Record<string, unknown>
  msg?: string
}

export class Printers {
  http: Client
  public options: PrintOptions
  public uriHelper: UriHelper

  constructor (options: PrintOptions, http: Client, uriHelper: UriHelper) {
    this.options = options
    this.http = http
    this.uriHelper = uriHelper
  }

  async getAll (query?: Record<string, unknown>): Promise<PrintersResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/printers')
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new errors.PrintersFetchFailed()

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new errors.PrintersFetchFailed()
    }
  }

  async get (printerId: string): Promise<PrinterResponse> {
    try {
      const base = this.uriHelper.generateBaseUri(`/printers/${printerId}`)
      const uri = this.uriHelper.generateUriWithQuery(base)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new errors.PrinterFetchFailed()

      return {
        data: response.data.results[0] as Printer,
        metadata: { count: response.data.count },
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new errors.PrinterFetchFailed()
    }
  }

  async create (printer: Record<string, unknown>): Promise<PrinterResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/printers')
      const uri = this.uriHelper.generateUriWithQuery(base)

      const response = await this.http.getClient().post(uri, printer)
      if (response.status !== 200) throw new errors.PrinterCreateFailed()

      return {
        data: response.data.results[0] as Printer,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new errors.PrinterCreateFailed()
    }
  }

  async update (printerId: string, printer: Record<string, unknown>): Promise<PrinterResponse> {
    try {
      const base = this.uriHelper.generateBaseUri(`/printers/${printerId}`)
      const uri = this.uriHelper.generateUriWithQuery(base)

      const response = await this.http.getClient().patch(uri, printer)
      if (response.status !== 200) throw new errors.PrinterUpdateFailed()

      return {
        data: response.data.results[0] as Printer,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new errors.PrinterUpdateFailed()
    }
  }

  async delete (printerId: string): Promise<PrinterResponse> {
    try {
      const base = this.uriHelper.generateBaseUri(`/printers/${printerId}`)
      const uri = this.uriHelper.generateUriWithQuery(base)

      const response = await this.http.getClient().delete(uri)
      if (response.status !== 200) throw new errors.PrinterDeleteFailed()

      return {
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new errors.PrinterDeleteFailed()
    }
  }
}
