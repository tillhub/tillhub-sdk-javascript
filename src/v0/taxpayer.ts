import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper } from '../uri-helper'

export interface TaxpayerOptions {
  user?: string
  base?: string
}

export interface TaxpayerResponse {
  data?: TaxpayerEntity
  metadata?: {
    count?: number
  }
  msg?: string
}

export enum PersonType {
  NATURAL = 'natural',
  LEGAL = 'legal'
}

export enum Salutation {
  MR = '1',
  MS = '2',
  OTHER = '3'
}

export interface PostAddress {
  house_number?: string
  street?: string
  town?: string
  zip_code?: string
}

export interface NaturalPersonInformation {
  salutation?: Salutation
  first_name?: string
  last_name?: string
  birthdate?: string
  identification_number?: string
}

export interface LegalPersonInformation {
  company_name?: string
  legal_form?: string
}

export interface TaxpayerEntity {
  personType?: PersonType
  taxNumber?: string
  address?: PostAddress
  organizationId?: string
  information?: LegalPersonInformation | NaturalPersonInformation
}

export class Taxpayer {
  http: Client
  public options: TaxpayerOptions
  public uriHelper: UriHelper

  constructor (options: TaxpayerOptions, http: Client, uriHelper: UriHelper) {
    this.options = options
    this.http = http
    this.uriHelper = uriHelper
  }

  async get (): Promise<TaxpayerResponse> {
    const uri = this.uriHelper.generateBaseUri('/taxpayer')

    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new TaxpayerFetchFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0] as TaxpayerEntity,
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new TaxpayerFetchFailed(error.message, { error })
    }
  }

  async put (taxpayer: TaxpayerEntity): Promise<TaxpayerResponse> {
    const uri = this.uriHelper.generateBaseUri('/taxpayer')
    try {
      const response = await this.http.getClient().put(uri, taxpayer)

      return {
        data: response.data.results[0] as TaxpayerEntity,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new TaxpayerPutFailed(error.message, { error })
    }
  }
}

export class TaxpayerFetchFailed extends BaseError {
  public name = 'TaxpayerFetchFailed'
  constructor (
    public message: string = 'Could not fetch taxpayer',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, TaxpayerFetchFailed.prototype)
  }
}

export class TaxpayerPutFailed extends BaseError {
  public name = 'TaxpayerPutFailed'
  constructor (
    public message: string = 'Could not alter taxpayer',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, TaxpayerPutFailed.prototype)
  }
}
