"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uri_helper_1 = require("../src/uri-helper");
var mockEndpoint = '/v1/testEndpoint';
var mockOptions = {
    user: '12345',
    base: 'http://localTesting:3000'
};
var expectedBaseUriResult = 'http://localTesting:3000/v1/testEndpoint/12345';
describe('UriHelper constructor', function () {
    it('will create a base uri', function () {
        var uriHelper = new uri_helper_1.UriHelper(mockEndpoint, mockOptions);
        expect(uriHelper.baseUri).toBe(expectedBaseUriResult);
    });
    it('will defalut to https://api.tillhub.com if no base is provided', function () {
        var noBase = { user: '23456' };
        var uriHelper = new uri_helper_1.UriHelper(mockEndpoint, noBase);
        var noBaseUri = "https://api.tillhub.com" + mockEndpoint + "/" + noBase.user;
        expect(uriHelper.baseUri).toBe(noBaseUri);
    });
    it('will be just base and endpoint if no user is provided', function () {
        var noUser = { base: 'http://localTesting:3000' };
        var uriHelper = new uri_helper_1.UriHelper(mockEndpoint, noUser);
        var noUserUri = "" + noUser.base + mockEndpoint;
        expect(uriHelper.baseUri).toBe(noUserUri);
    });
});
describe('UriHelper generateBaseUri()', function () {
    it('will return the base url if no additon path is inputed', function () {
        var uriHelper = new uri_helper_1.UriHelper(mockEndpoint, mockOptions);
        var result = uriHelper.generateBaseUri();
        expect(result).toBe(uriHelper.baseUri);
    });
    it('will return the base url with addition path input', function () {
        var uriHelper = new uri_helper_1.UriHelper(mockEndpoint, mockOptions);
        var mockPath = '/new/test/item';
        var result = uriHelper.generateBaseUri(mockPath);
        var expected = expectedBaseUriResult + mockPath;
        expect(result).toBe(expected);
    });
});
describe('UriHelper generateUriWithQuery()', function () {
    it('will return the base url if no query is inputed', function () {
        var uriHelper = new uri_helper_1.UriHelper(mockEndpoint, mockOptions);
        var result = uriHelper.generateUriWithQuery('http://localTesting:4000');
        expect(result).toBe('http://localTesting:4000');
    });
    it('will return uri if uri is in query', function () {
        var uriHelper = new uri_helper_1.UriHelper(mockEndpoint, mockOptions);
        var baseUrl = 'http://localTesting:4000';
        var query = { uri: 'http://localTesting:5000/uri', testKey: 'testValue' };
        var result = uriHelper.generateUriWithQuery(baseUrl, query);
        expect(result).toBe(query.uri);
    });
    it('will return uri if uri is in nested query', function () {
        var uriHelper = new uri_helper_1.UriHelper(mockEndpoint, mockOptions);
        var baseUrl = 'http://localTesting:4000';
        var query = { query: { uri: 'http://localTesting:5000/uri' }, testKey: 'testValue' };
        var result = uriHelper.generateUriWithQuery(baseUrl, query);
        expect(result).toBe(query.query.uri);
    });
    it('will return query stringified', function () {
        var uriHelper = new uri_helper_1.UriHelper(mockEndpoint, mockOptions);
        var baseUrl = 'http://localTesting:6000';
        var query = { key1: 'value1', key2: 'value2', key3: 'value3' };
        var expectedUri = baseUrl + "?key1=value1&key2=value2&key3=value3";
        var result = uriHelper.generateUriWithQuery(baseUrl, query);
        expect(result).toBe(expectedUri);
    });
    it('will return nested query stringified', function () {
        var uriHelper = new uri_helper_1.UriHelper(mockEndpoint, mockOptions);
        var baseUrl = 'http://localTesting:7000';
        var query = { query: { key1: 'value1', key2: 'value2', key3: 'value3' } };
        var expectedUri = baseUrl + "?key1=value1&key2=value2&key3=value3";
        var result = uriHelper.generateUriWithQuery(baseUrl, query);
        expect(result).toBe(expectedUri);
    });
    it('will return flatten query stringified', function () {
        var uriHelper = new uri_helper_1.UriHelper(mockEndpoint, mockOptions);
        var baseUrl = 'http://localTesting:8000';
        var query = { key1: 'value1', query: { key2: 'value2', key3: 'value3' } };
        var expectedUri = baseUrl + "?key1=value1&key2=value2&key3=value3";
        var result = uriHelper.generateUriWithQuery(baseUrl, query);
        expect(result).toBe(expectedUri);
    });
    it('will remove undefined values', function () {
        var uriHelper = new uri_helper_1.UriHelper(mockEndpoint, mockOptions);
        var baseUrl = 'http://localTesting:9000';
        var query = { key1: 'value1', query: { key2: undefined, key3: 'value3' } };
        var expectedUri = baseUrl + "?key1=value1&key3=value3";
        var result = uriHelper.generateUriWithQuery(baseUrl, query);
        expect(result).toBe(expectedUri);
    });
});
//# sourceMappingURL=uri-helper.test.js.map