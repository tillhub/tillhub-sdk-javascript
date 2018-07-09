import Tillhub from '../src/tillhub-js'

/**
 * Dummy test
 */
describe('SDK: can instantiate SDK', () => {
  it('Tillhub is instantiable', () => {
    expect(new Tillhub()).toBeInstanceOf(Tillhub)
  })

  it('Tillhub is instantiable', () => {
    expect(
      new Tillhub({
        user: 'SOMEUSER',
        auth: {
          email: '[something]',
          password: '[something]'
        },
        endpoint: 'https://staging.tillhub.de'
      })
    ).toBeInstanceOf(Tillhub)
  })
})
