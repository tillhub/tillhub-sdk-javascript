import { UriHelper } from '../src/uri-helper'

const mockEndpoint = '/v1/testEndpoint'

const mockOptions = {
  user: '12345',
  base: 'http://localTesting:3000'
}

const expectedBaseUriResult = 'http://localTesting:3000/v1/testEndpoint/12345'

describe('UriHelper constructor', () => {

  it('will create a base uri', () => {
    const uriHelper = new UriHelper(mockEndpoint, mockOptions)
    expect(uriHelper.baseUri).toBe(expectedBaseUriResult)
  })

})

describe('UriHelper generateBaseUri()', () => {

  it('will return the base url if no additon path is inputed', () => {
    const uriHelper = new UriHelper(mockEndpoint, mockOptions)
    const result = uriHelper.generateBaseUri()
    expect(result).toBe(uriHelper.baseUri)
  })

  it('will return the base url with addition path input', () => {
    const uriHelper = new UriHelper(mockEndpoint, mockOptions)
    const mockPath = '/new/test/item'
    const result = uriHelper.generateBaseUri(mockPath)
    const expected = expectedBaseUriResult + mockPath
    expect(result).toBe(expected)
  })

})

describe('UriHelper generateUriWithQuery()', () => {

  it('will return the base url if no query is inputed', () => {
    const uriHelper = new UriHelper(mockEndpoint, mockOptions)
    const result = uriHelper.generateUriWithQuery('http://localTesting:4000')
    expect(result).toBe('http://localTesting:4000')
  })

  it('will return uri if uri is in query', () => {
    const uriHelper = new UriHelper(mockEndpoint, mockOptions)
    const baseUrl = 'http://localTesting:4000'
    const query = { uri: 'http://localTesting:5000/uri', testKey: 'testValue' }
    const result = uriHelper.generateUriWithQuery(baseUrl, query)
    expect(result).toBe(query.uri)
  })

  it('will return uri if uri is in nested query', () => {
    const uriHelper = new UriHelper(mockEndpoint, mockOptions)
    const baseUrl = 'http://localTesting:4000'
    const query = { query: { uri: 'http://localTesting:5000/uri' }, testKey: 'testValue' }
    const result = uriHelper.generateUriWithQuery(baseUrl, query)
    expect(result).toBe(query.query.uri)
  })

  it('will return query stringified', () => {
    const uriHelper = new UriHelper(mockEndpoint, mockOptions)
    const baseUrl = 'http://localTesting:6000'
    const query = { key1: 'value1', key2: 'value2', key3: 'value3' }
    const expectedUri = `${baseUrl}?key1=value1&key2=value2&key3=value3`
    const result = uriHelper.generateUriWithQuery(baseUrl, query)
    expect(result).toBe(expectedUri)
  })

  it('will return nested query stringified', () => {
    const uriHelper = new UriHelper(mockEndpoint, mockOptions)
    const baseUrl = 'http://localTesting:7000'
    const query = { query: { key1: 'value1', key2: 'value2', key3: 'value3' } }
    const expectedUri = `${baseUrl}?key1=value1&key2=value2&key3=value3`
    const result = uriHelper.generateUriWithQuery(baseUrl, query)
    expect(result).toBe(expectedUri)
  })

  it('will return flatten query stringified', () => {
    const uriHelper = new UriHelper(mockEndpoint, mockOptions)
    const baseUrl = 'http://localTesting:8000'
    const query = { key1: 'value1', query: {  key2: 'value2', key3: 'value3' } }
    const expectedUri = `${baseUrl}?key1=value1&key2=value2&key3=value3`
    const result = uriHelper.generateUriWithQuery(baseUrl, query)
    expect(result).toBe(expectedUri)
  })

  it('will remove undefined values', () => {
    const uriHelper = new UriHelper(mockEndpoint, mockOptions)
    const baseUrl = 'http://localTesting:9000'
    const query = { key1: 'value1', query: { key2: undefined, key3: 'value3' } }
    const expectedUri = `${baseUrl}?key1=value1&key3=value3`
    const result = uriHelper.generateUriWithQuery(baseUrl, query)
    expect(result).toBe(expectedUri)
  })
})
