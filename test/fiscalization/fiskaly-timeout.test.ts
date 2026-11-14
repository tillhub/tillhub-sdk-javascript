import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { initThInstance } from '../util'
import { TillhubClient } from '../../src/tillhub-js'
dotenv.config()

const legacyId = '4564'
const branchId = 'branch-1'
const submissionId = 'submission-1'
const registerId = 'register-1'
const fiscalizationUri = `https://api.tillhub.com/api/v0/fiscalization/${legacyId}`
const submissionsUri = `https://api.tillhub.com/api/v0/submissions/${legacyId}`
const submissionUri = `${submissionsUri}/branches/${branchId}/submissions/${submissionId}`

const mock = new MockAdapter(axios)

const ok = { status: 200, msg: 'Success', count: 1, results: [{}] }

beforeEach(() => {
  mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(() => [
    200,
    { token: '', user: { id: '123', legacy_id: legacyId } }
  ])
  mock.onAny().reply(() => [200, ok])
})

afterEach(() => {
  mock.reset()
})

const lastRequest = (): { url?: string, timeout?: number } => {
  const all = [
    ...mock.history.get,
    ...mock.history.post,
    ...mock.history.put,
    ...mock.history.patch,
    ...mock.history.delete
  ].filter(({ url }) => url !== 'https://api.tillhub.com/api/v0/users/login')
  return all[all.length - 1]
}

describe('v0: requests that call Fiskaly', () => {
  it.each<[string, string, (th: TillhubClient) => Promise<unknown>]>([
    ['fiscalization().init', `${fiscalizationUri}/initialize`, async (th) => await th.fiscalization().init({ provider: 'fiskaly', payload: {} } as any)],
    ['fiscalization().setLicense', `${fiscalizationUri}/branches/${branchId}/set-license`, async (th) => await th.fiscalization().setLicense(branchId, { licenseKey: 'key' })],
    ['fiscalization().createFiskalyDeOrganization', `${fiscalizationUri}/fiskaly/organizations`, async (th) => await th.fiscalization().createFiskalyDeOrganization({ company: { name: 'n', street: 's', postalCode: '10115', locality: 'Berlin', country: 'DEU' } })],
    ['fiscalization().createFiskalyDeTss', `${fiscalizationUri}/registers/${registerId}/tss`, async (th) => await th.fiscalization().createFiskalyDeTss(registerId)],
    ['submissions().create', `${submissionUri}/create`, async (th) => await th.submissions().create(branchId, submissionId)],
    ['submissions().trigger', `${submissionUri}/trigger`, async (th) => await th.submissions().trigger(branchId, submissionId)],
    ['submissions().delete', submissionUri, async (th) => await th.submissions().delete(branchId, submissionId)],
    ['submissions().getPreviewPdf', `${submissionUri}/preview`, async (th) => await th.submissions().getPreviewPdf(branchId, submissionId)],
    ['submissions().getPdf', `${submissionUri}/download`, async (th) => await th.submissions().getPdf(branchId, submissionId)],
    ['submissions().taxpayer().put', `${submissionsUri}/taxpayer`, async (th) => await th.submissions().taxpayer().put({} as any)]
  ])('%s waits up to 60000 ms', async (_name, url, call) => {
    const th = await initThInstance()
    await call(th)

    expect(lastRequest()).toMatchObject({ url, timeout: 60000 })
  })
})

describe('v0: fiscalization requests that do not call Fiskaly', () => {
  it.each<[string, string, (th: TillhubClient) => Promise<unknown>]>([
    ['submissions().getOverview', `${submissionsUri}/submissions/overview`, async (th) => await th.submissions().getOverview()],
    ['submissions().getCurrent', `${submissionsUri}/branches/${branchId}/submissions/current`, async (th) => await th.submissions().getCurrent(branchId)],
    ['submissions().patchRegister', `${submissionsUri}/branches/${branchId}/submissions/registers/${registerId}`, async (th) => await th.submissions().patchRegister(branchId, registerId, {} as any)],
    ['submissions().taxpayer().get', `${submissionsUri}/taxpayer`, async (th) => await th.submissions().taxpayer().get()]
  ])('%s keeps the client timeout of 10000 ms', async (_name, url, call) => {
    const th = await initThInstance()
    await call(th)

    expect(lastRequest()).toMatchObject({ url, timeout: 10000 })
  })
})
