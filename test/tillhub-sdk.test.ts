import Tillhub from '../src/tillhub-sdk'

/**
 * Dummy test
 */
describe('Dummy test', () => {
  it('works if true is truthy', () => {
    expect(true).toBeTruthy()
  })

  it('DummyClass is instantiable', () => {
    expect(new Tillhub()).toBeInstanceOf(Tillhub)
  })
})
