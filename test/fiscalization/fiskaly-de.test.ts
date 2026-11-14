import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { initThInstance } from '../util'
import { FiskalyDeOrganizationCreateRequest } from '../../src/v0/fiscalization'
dotenv.config()

const legacyId = '4564'
const registerId = '2c1f7d4e-8a3b-4c5d-9e6f-0a1b2c3d4e5f'
const baseUri = `https://api.tillhub.com/api/v0/fiscalization/${legacyId}`

const organizationRequest: FiskalyDeOrganizationCreateRequest = {
  branchId: '7b9e1c2d-3f4a-4b5c-8d6e-9f0a1b2c3d4e',
  company: {
    name: 'Muster GmbH',
    street: 'Hauptstraße',
    streetNumber: '1',
    postalCode: '10115',
    locality: 'Berlin',
    country: 'DEU',
    vatId: 'DE123456789',
    taxNumber: null
  }
}

const organization = {
  organizationId: 'org-1',
  organizationType: 'ACCOUNT',
  managedBy: 'managed-by-1'
}

const tss = {
  tssId: 'tss-1',
  clientId: 'client-1',
  clientSerialNumber: 'serial-1'
}

const mock = new MockAdapter(axios)

beforeEach(() => {
  mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(() => [
    200,
    { token: '', user: { id: '123', legacy_id: legacyId } }
  ])
})

afterEach(() => {
  mock.reset()
})

describe('v0: Fiscalization: Fiskaly DE', () => {
  describe('createFiskalyDeOrganization', () => {
    it('posts the company and returns the organization', async () => {
      mock.onPost(`${baseUri}/fiskaly/organizations`).reply(() => [
        200,
        { status: 200, msg: 'Organization created.', results: [organization] }
      ])

      const th = await initThInstance()
      const { data, msg } = await th.fiscalization().createFiskalyDeOrganization(organizationRequest)

      expect(data).toEqual(organization)
      expect(msg).toBe('Organization created.')
      expect(JSON.parse(mock.history.post[1].data)).toEqual(organizationRequest)
    })

    it('rejects on status codes that are not 200', async () => {
      expect.assertions(1)
      mock.onPost(`${baseUri}/fiskaly/organizations`).reply(() => [205])

      const th = await initThInstance()
      await expect(th.fiscalization().createFiskalyDeOrganization(organizationRequest))
        .rejects.toMatchObject({ name: 'FiscalizationFiskalyDeOrganizationCreateFailed' })
    })

    it('keeps the error code of a 409', async () => {
      expect.assertions(1)
      mock.onPost(`${baseUri}/fiskaly/organizations`).reply(() => [
        409,
        { status: 409, msg: 'Conflict', errorCode: 'FISKALY_ORGANIZATION_EXISTS' }
      ])

      const th = await initThInstance()
      await expect(th.fiscalization().createFiskalyDeOrganization(organizationRequest)).rejects.toMatchObject({
        name: 'FiscalizationFiskalyDeOrganizationCreateFailed',
        properties: { error: { response: { data: { errorCode: 'FISKALY_ORGANIZATION_EXISTS' } } } }
      })
    })
  })

  describe('createFiskalyDeTss', () => {
    it('posts to the register and returns the TSS', async () => {
      mock.onPost(`${baseUri}/registers/${registerId}/tss`).reply(() => [
        200,
        { status: 200, msg: 'TSS created.', results: [tss] }
      ])

      const th = await initThInstance()
      const { data, msg } = await th.fiscalization().createFiskalyDeTss(registerId)

      expect(data).toEqual(tss)
      expect(msg).toBe('TSS created.')
    })

    it('rejects on status codes that are not 200', async () => {
      expect.assertions(1)
      mock.onPost(`${baseUri}/registers/${registerId}/tss`).reply(() => [205])

      const th = await initThInstance()
      await expect(th.fiscalization().createFiskalyDeTss(registerId))
        .rejects.toMatchObject({ name: 'FiscalizationFiskalyDeTssCreateFailed' })
    })

    it('keeps the error code of a 409', async () => {
      expect.assertions(1)
      mock.onPost(`${baseUri}/registers/${registerId}/tss`).reply(() => [
        409,
        { status: 409, msg: 'Conflict', errorCode: 'FISKALY_TSS_EXISTS' }
      ])

      const th = await initThInstance()
      await expect(th.fiscalization().createFiskalyDeTss(registerId)).rejects.toMatchObject({
        name: 'FiscalizationFiskalyDeTssCreateFailed',
        properties: { error: { response: { data: { errorCode: 'FISKALY_TSS_EXISTS' } } } }
      })
    })
  })

  describe('timeout', () => {
    beforeEach(() => {
      mock.onPost(`${baseUri}/fiskaly/organizations`).reply(() => [
        200,
        { status: 200, msg: 'Organization created.', results: [organization] }
      ])
      mock.onPost(`${baseUri}/registers/${registerId}/tss`).reply(() => [
        200,
        { status: 200, msg: 'TSS created.', results: [tss] }
      ])
    })

    it('sends both requests with the timeout passed to fiscalization()', async () => {
      const th = await initThInstance()
      const fiscalization = th.fiscalization({ timeout: 60000 })
      await fiscalization.createFiskalyDeOrganization(organizationRequest)
      await fiscalization.createFiskalyDeTss(registerId)

      expect(mock.history.post[1].timeout).toBe(60000)
      expect(mock.history.post[2].timeout).toBe(60000)
    })

    it('sends both requests with the client timeout of 10000 ms when none is passed', async () => {
      const th = await initThInstance()
      await th.fiscalization().createFiskalyDeOrganization(organizationRequest)
      await th.fiscalization().createFiskalyDeTss(registerId)

      expect(mock.history.post[1].timeout).toBe(10000)
      expect(mock.history.post[2].timeout).toBe(10000)
    })
  })
})
