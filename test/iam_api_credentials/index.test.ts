import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v0 } from '../../src/tillhub-js'
import { initThInstance } from '../util'

dotenv.config()

const tenantId = '0f8fad5b-d9cb-469f-a165-70867728950e'
const clientId = 'b3f3c9e2-1c2d-4e5f-8a9b-0c1d2e3f4a5b'
const baseUrl = `https://api.tillhub.com/api/v0/iam/api-credentials/${tenantId}`
const mock = new MockAdapter(axios)

const credential = {
  clientId,
  createdAt: '2026-11-23T10:00:00.000Z',
  createdBy: 'admin@example.com',
  secretExpiresAt: '2027-11-23T10:00:00.000Z',
  rotatedSecretExpiresAt: null,
  lastUsedAt: null
}

const createdCredential = {
  clientId,
  clientSecret: 'new-secret',
  createdAt: '2026-11-23T10:00:00.000Z',
  secretExpiresAt: '2027-11-23T10:00:00.000Z'
}

const rotatedSecret = {
  clientSecret: 'rotated-secret',
  secretExpiresAt: '2027-11-23T10:00:00.000Z',
  rotatedSecretExpiresAt: '2026-11-24T10:00:00.000Z'
}

beforeEach(() => {
  mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(200, {
    token: '',
    user: {
      id: '123',
      legacy_id: tenantId
    }
  })
})

afterEach(() => {
  mock.reset()
})

describe('v0: IamApiCredentials', () => {
  it('lists API credentials for the authenticated tenant', async () => {
    mock.onGet(baseUrl).reply(200, { count: 1, results: [credential] })

    const th = await initThInstance()
    const apiCredentials = th.iamApiCredentials()

    expect(apiCredentials).toBeInstanceOf(v0.IamApiCredentials)
    await expect(apiCredentials.getAll()).resolves.toEqual({
      data: [credential],
      metadata: { count: 1 }
    })
  })

  it('creates an API credential and returns its one-time secret', async () => {
    mock.onPost(baseUrl).reply(201, { count: 1, results: [createdCredential] })

    const th = await initThInstance()

    await expect(th.iamApiCredentials().create()).resolves.toEqual({
      data: createdCredential,
      metadata: { count: 1 }
    })
  })

  it('rotates an API credential secret', async () => {
    mock.onPost(`${baseUrl}/${clientId}/rotate-secret`).reply(200, {
      count: 1,
      results: [rotatedSecret]
    })

    const th = await initThInstance()

    await expect(th.iamApiCredentials().rotateSecret(clientId)).resolves.toEqual({
      data: rotatedSecret,
      metadata: { count: 1 }
    })
  })

  it('revokes a rotated secret', async () => {
    mock.onDelete(`${baseUrl}/${clientId}/rotated-secret`).reply(204)

    const th = await initThInstance()

    await expect(th.iamApiCredentials().revokeRotatedSecret(clientId)).resolves.toBeUndefined()
  })

  it('deletes an API credential', async () => {
    mock.onDelete(`${baseUrl}/${clientId}`).reply(204)

    const th = await initThInstance()

    await expect(th.iamApiCredentials().delete(clientId)).resolves.toBeUndefined()
  })

  it.each([
    ['getAll', 'IamApiCredentialsFetchFailed', () => mock.onGet(baseUrl).reply(500)],
    ['create', 'IamApiCredentialCreateFailed', () => mock.onPost(baseUrl).reply(500)],
    ['rotateSecret', 'IamApiCredentialSecretRotateFailed', () => mock.onPost(`${baseUrl}/${clientId}/rotate-secret`).reply(500)],
    ['revokeRotatedSecret', 'IamApiCredentialRotatedSecretRevokeFailed', () => mock.onDelete(`${baseUrl}/${clientId}/rotated-secret`).reply(500)],
    ['delete', 'IamApiCredentialDeleteFailed', () => mock.onDelete(`${baseUrl}/${clientId}`).reply(500)]
  ])('wraps failed %s requests in %s', async (method, errorName, arrange) => {
    arrange()
    const th = await initThInstance()
    const apiCredentials = th.iamApiCredentials()

    try {
      if (method === 'getAll') await apiCredentials.getAll()
      if (method === 'create') await apiCredentials.create()
      if (method === 'rotateSecret') await apiCredentials.rotateSecret(clientId)
      if (method === 'revokeRotatedSecret') await apiCredentials.revokeRotatedSecret(clientId)
      if (method === 'delete') await apiCredentials.delete(clientId)
      fail('Expected the request to fail')
    } catch (error: any) {
      expect(error.name).toBe(errorName)
    }
  })
})
