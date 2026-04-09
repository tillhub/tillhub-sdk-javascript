import { TillhubClient } from '../src/tillhub-js'
import { Client } from '../src/client'

describe('SDK: destroy on uninitialized instance', () => {
  it('can call destroy on uninitialized SDK without crashing', () => {
    const sdk = new TillhubClient()

    expect(sdk.http).toBeUndefined()
    expect(sdk.options).toBeUndefined()

    expect(() => {
      sdk.destroy()
    }).not.toThrow()
  })

  it('can call Client.clearInstance when instance is undefined', () => {
    const sdk = new TillhubClient()
    sdk.destroy()

    expect(() => {
      Client.clearInstance()
    }).not.toThrow()
  })

  it('destroy is idempotent - can be called multiple times', () => {
    const sdk = new TillhubClient()

    sdk.init({
      base: 'https://api.tillhub.com',
      credentials: {
        token: 'test-token'
      },
      user: 'test-user'
    })

    expect(sdk.http).toBeDefined()
    expect(sdk.options).toBeDefined()

    sdk.destroy()
    expect(sdk.http).toBeUndefined()
    expect(sdk.options).toBeUndefined()

    expect(() => {
      sdk.destroy()
    }).not.toThrow()

    expect(() => {
      sdk.destroy()
    }).not.toThrow()
  })
})
