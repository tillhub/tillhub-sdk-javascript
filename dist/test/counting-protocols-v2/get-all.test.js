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
describe('v2: AnalyticsReportsCountingProtocols: can get all the counting protocols', function () {
    it("Tillhub's analyticsReportsCountingProtocols are instantiable", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var th, analyticsReportsCountingProtocols, data;
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
                            .onGet("https://api.tillhub.com/api/v2/analytics/" + legacyId + "/reports/cashier_counting_protocols/overview")
                            .reply(function () {
                            return [
                                200,
                                {
                                    count: 1,
                                    results: [
                                        {
                                            metric: {
                                                job: 'reports_counting_protocols_v2_overview_data'
                                            },
                                            values: [{}]
                                        },
                                        {
                                            metric: {
                                                job: 'reports_counting_protocols_v2_overview_summary'
                                            },
                                            values: [{}]
                                        },
                                        {
                                            metric: {
                                                job: 'reports_counting_protocols_v2_overview_filtered_meta'
                                            },
                                            values: [{ count: 1 }]
                                        },
                                        {
                                            metric: {
                                                job: 'reports_counting_protocols_v2_overview_meta'
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
                    th = _a.sent();
                    analyticsReportsCountingProtocols = th.analyticsHandlers().analytics.reports
                        .AnalyticsReportsCountingProtocols;
                    expect(analyticsReportsCountingProtocols).toBeInstanceOf(tillhub_js_1.v2.analytics.reports.AnalyticsReportsCountingProtocols);
                    return [4 /*yield*/, analyticsReportsCountingProtocols.getAll()];
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
                            .onGet("https://api.tillhub.com/api/v2/analytics/" + legacyId + "/reports/cashier_counting_protocols/overview")
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
                    return [4 /*yield*/, th.analyticsHandlers().analytics.reports.AnalyticsReportsCountingProtocols.getAll()];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    expect(err_1.name).toBe('AnalyticsReportsCountingProtocolsFetchFailed');
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=get-all.test.js.map