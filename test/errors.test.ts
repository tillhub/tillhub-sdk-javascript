import * as dotenv from 'dotenv'

dotenv.config()
import * as errors from '../src/errors'

describe('SDK: errors', () => {
  it('can instantiate error', () => {
    expect(new errors.VoucherFetchFailed()).toBeDefined()
    expect(new errors.BaseError('some new eror')).toBeDefined()
  })

  it('can instantiate error with message', () => {
    const err = new errors.VoucherFetchFailed()
    expect(err).toHaveProperty('name')
    expect(typeof err.name).toBe('string')
    expect(err).toHaveProperty('message')
    expect(typeof err.message).toBe('string')
    expect(err.name).toBe('VoucherFetchFailed')

    const err2 = new errors.VoucherFetchFailed('something')
    expect(err2).toHaveProperty('name')
    expect(typeof err2.name).toBe('string')
    expect(err2).toHaveProperty('message')
    expect(typeof err2.message).toBe('string')
    expect(err2.message).toBe('something')
    expect(err2.name).toBe(err.name)
    expect(err2.message).not.toBe(err.message)
  })

  it('can instantiate error with injected properties', () => {
    const props = { some: 'property' }
    const err = new errors.VoucherFetchFailed(undefined, props)
    expect(err.properties).toBeDefined()
    expect(err.properties).toEqual(props)
  })
})
