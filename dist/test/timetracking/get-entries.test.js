"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var dotenv = tslib_1.__importStar(require("dotenv"));
var axios_1 = tslib_1.__importDefault(require("axios"));
var qs_1 = tslib_1.__importDefault(require("qs"));
var axios_mock_adapter_1 = tslib_1.__importDefault(require("axios-mock-adapter"));
var tillhub_js_1 = require("../../src/tillhub-js");
var util_1 = require("../util");
dotenv.config();
var legacyId = '4564';
var mock = new axios_mock_adapter_1.default(axios_1.default);
afterEach(function () {
    mock.reset();
});
var staffId = '1234';
var date = '2000-01-01';
var query = { date: date };
var queryString = qs_1.default.stringify(query, { addQueryPrefix: true });
var timetrackingResponse = [
    {
        id: 'asdf-wert',
        staff: '1234',
        owner: '456E438E3E0E47219FE9900870C4D328',
        client_id: '1DD4BECB-15D3-44E3-806A-DCA5F9B26095',
        type: 'day',
        description: null,
        started_at: '2000-01-01T09:15:27.000Z',
        ended_at: '2000-01-01T18:49:27.000Z',
        custom_properties: null,
        location: null,
        metadata: null,
        deleted: false,
        active: true,
        created_at: '2000-01-02T09:42:53.435Z',
        updated_at: '2000-01-02T09:44:55.122Z'
    }
];
describe('v0: Timetracking: can get the timetracking entries for a specific staff member', function () {
    it("Tillhub's products are instantiable", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var th, Timetracking, data;
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
                            .onGet("https://api.tillhub.com/api/v0/time_tracking/" + legacyId + "/entries/staff/" + staffId + queryString)
                            .reply(function () {
                            return [
                                200,
                                {
                                    count: 1,
                                    results: timetrackingResponse
                                }
                            ];
                        });
                    }
                    return [4 /*yield*/, util_1.initThInstance()];
                case 1:
                    th = _a.sent();
                    Timetracking = th.timetracking();
                    expect(Timetracking).toBeInstanceOf(tillhub_js_1.v0.Timetracking);
                    return [4 /*yield*/, Timetracking.getEntries(staffId, { query: query })];
                case 2:
                    data = (_a.sent()).data;
                    expect(data).toMatchObject(timetrackingResponse);
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
                            .onGet("https://api.tillhub.com/api/v0/time_tracking/" + legacyId + "/entries/staff/" + staffId + queryString)
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
                    return [4 /*yield*/, th.timetracking().getEntries(staffId, { query: query })];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    expect(err_1.name).toBe('TimetrackingEntriesFetchFailed');
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=get-entries.test.js.map