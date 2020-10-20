"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var dotenv = tslib_1.__importStar(require("dotenv"));
var axios_1 = tslib_1.__importDefault(require("axios"));
var axios_mock_adapter_1 = tslib_1.__importDefault(require("axios-mock-adapter"));
var tillhub_js_1 = require("../../src/tillhub-js");
var util_1 = require("../util");
dotenv.config();
var legacyId = '4564';
var locationId = 'ec06a622-076d-4f5c-8cc3-105029e2b3f5';
var locationObject = {
    created_at: {
        iso: '2018-08-01T15:08:05.023Z',
        unix: 1533136085023
    },
    id: 'ec06a622-076d-4f5c-8cc3-105029e2b3f5',
    name: 'Branch Belvedere',
    insert_id: 15,
    type: 'branch',
    updated_at: null,
    qty: null
};
var mock = new axios_mock_adapter_1.default(axios_1.default);
afterEach(function () {
    mock.reset();
});
describe('v0: Stock: Locations: can get one', function () {
    it("Tillhub's stocks is instantiable", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var th, stocks, data;
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
                            .onGet("https://api.tillhub.com/api/v0/stock/" + legacyId + "/locations/" + locationId)
                            .reply(function () {
                            return [
                                200,
                                {
                                    count: 1,
                                    results: [locationObject]
                                }
                            ];
                        });
                    }
                    return [4 /*yield*/, util_1.initThInstance()];
                case 1:
                    th = _a.sent();
                    stocks = th.stocks();
                    expect(stocks).toBeInstanceOf(tillhub_js_1.v0.Stocks);
                    return [4 /*yield*/, stocks.getOneLocation(locationId)];
                case 2:
                    data = (_a.sent()).data;
                    expect(data).toEqual(locationObject);
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
                            .onGet("https://api.tillhub.com/api/v0/stock/" + legacyId + "/locations/" + locationId)
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
                    return [4 /*yield*/, th.stocks().getOneLocation(locationId)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    expect(err_1.name).toBe('StocksLocationFetchOneFailed');
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=get-one-location.test.js.map