import * as dotenv from 'dotenv'
import ThRealtime from '../../src/realtime'
dotenv.config()

describe('SDK: client: can instantiate SDK client', () => {
  it('TillhubRealtime instantiable', () => {
    const realtime = new ThRealtime()
    expect(realtime).toBeInstanceOf(ThRealtime)
    expect(realtime.isInitialized()).toBe(true)
  })
})
