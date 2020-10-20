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
var mock = new axios_mock_adapter_1.default(axios_1.default);
afterEach(function () {
    mock.reset();
});
describe('v2: AnalyticsReportsTransactionsItems: can get all the transactions items', function () {
    it("Tillhub's analyticsReportsTransactionsItems are instantiable", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var th, analyticsReportsTransactionsItems, _a, data, summary, metaData;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
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
                            .onGet("https://api.tillhub.com/api/v2/analytics/" + legacyId + "/reports/transactions/items")
                            .reply(function () {
                            return [
                                200,
                                {
                                    count: 1,
                                    results: [
                                        {
                                            metric: {
                                                job: 'reports_transactions_items_v2_overview_data'
                                            },
                                            values: [{}]
                                        },
                                        {
                                            metric: {
                                                job: 'reports_transactions_items_v2_overview_summary'
                                            },
                                            values: [{}]
                                        },
                                        {
                                            metric: {
                                                job: 'reports_transactions_items_v2_overview_filtered_meta'
                                            },
                                            values: [{ count: 1 }]
                                        },
                                        {
                                            metric: {
                                                job: 'reports_transactions_items_v2_overview_meta'
                                            },
                                            values: [{ count: 1 }]
                                        }
                                    ]
                                }
                            ];
                        });
                    }
                    return [4 /*yield*/, util_1.initThInstance()];
                case 1:
                    th = _b.sent();
                    analyticsReportsTransactionsItems = th.analyticsHandlers().analytics.reports
                        .AnalyticsReportsTransactionsItems;
                    expect(analyticsReportsTransactionsItems).toBeInstanceOf(tillhub_js_1.v2.analytics.reports.AnalyticsReportsTransactionsItems);
                    return [4 /*yield*/, analyticsReportsTransactionsItems.getAll()];
                case 2:
                    _a = _b.sent(), data = _a.data, summary = _a.summary, metaData = _a.metaData;
                    expect(Array.isArray(data)).toBe(true);
                    expect(Array.isArray(summary)).toBe(true);
                    expect(metaData.count).toBe(1);
                    expect(metaData.total_count).toBe(1);
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
                            .onGet("https://api.tillhub.com/api/v2/analytics/" + legacyId + "/reports/transactions/items")
                            .reply(function () {
                            return [205];
                        });
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, util_1.initThInstance()];
                case 2:
                    th = _a.sent();
                    return [4 /*yield*/, th.analyticsHandlers().analytics.reports.AnalyticsReportsTransactionsItems.getAll()];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    expect(err_1.name).toBe('AnalyticsReportsTransactionsItemsFetchError');
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=get-all.test.js.map