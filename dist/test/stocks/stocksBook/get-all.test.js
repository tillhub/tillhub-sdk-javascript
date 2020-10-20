"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var qs_1 = tslib_1.__importDefault(require("qs"));
var dotenv = tslib_1.__importStar(require("dotenv"));
var axios_1 = tslib_1.__importDefault(require("axios"));
var axios_mock_adapter_1 = tslib_1.__importDefault(require("axios-mock-adapter"));
dotenv.config();
var tillhub_js_1 = require("../../../src/tillhub-js");
var util_1 = require("../../util");
var legacyId = '4564';
var query = {
    limit: 15,
    embed: ['product', 'location'],
    start: '2018-10-05T10:27:12.929Z',
    end: '2019-02-04T12:29:52.929Z',
    product: 'a8fd68f1-3fc0-47bd-87c3-3b23e8750bc3',
    location: 'b1f8fb64-e468-43a4-a5da-f22d87ca9bd3',
    to: 'b1f8fb64-e468-43a4-a5da-f22d87ca9bd3',
    from: '9a638aa4-ce10-42d8-91b9-902ff0aba034'
};
var queryString = qs_1.default.stringify(query);
var mock = new axios_mock_adapter_1.default(axios_1.default);
afterEach(function () {
    mock.reset();
});
describe('v0: StocksBook: can get all', function () {
    it("Tillhub's stocksBook is instantiable", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var th, stocksBook, data;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (process.env.SYSTEM_TEST !== 'true') {
                        mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(function () {
                            return [
                                200,
                                {
                                    token: '',
                                    user: {
                                        id: '123',
                                        legacy_id: legacyId
                                    }
                                }
                            ];
                        });
                        mock
                            .onGet("https://api.tillhub.com/api/v0/stock/" + legacyId + "/book?" + queryString)
                            .reply(function () {
                            return [
                                200,
                                {
                                    count: 1,
                                    results: [{}]
                                }
                            ];
                        });
                    }
                    return [4 /*yield*/, util_1.initThInstance()];
                case 1:
                    th = _a.sent();
                    stocksBook = th.stocksBook();
                    expect(stocksBook).toBeInstanceOf(tillhub_js_1.v0.StocksBook);
                    return [4 /*yield*/, stocksBook.getAll(query)];
                case 2:
                    data = (_a.sent()).data;
                    expect(Array.isArray(data)).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
    it('rejects on status codes that are not 200', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var th, err_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (process.env.SYSTEM_TEST !== 'true') {
                        mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(function () {
                            return [
                                200,
                                {
                                    token: '',
                                    user: {
                                        id: '123',
                                        legacy_id: legacyId
                                    }
                                }
                            ];
                        });
                        mock
                            .onGet("https://api.tillhub.com/api/v0/stock/" + legacyId + "/book?" + queryString)
                            .reply(function () {
                            return [400];
                        });
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, util_1.initThInstance()];
                case 2:
                    th = _a.sent();
                    return [4 /*yield*/, th.stocksBook().getAll(query)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    expect(err_1.name).toBe('StocksBookFetchFailed');
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=get-all.test.js.map