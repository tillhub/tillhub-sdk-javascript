"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var dotenv = tslib_1.__importStar(require("dotenv"));
var axios_1 = tslib_1.__importDefault(require("axios"));
var axios_mock_adapter_1 = tslib_1.__importDefault(require("axios-mock-adapter"));
var qs_1 = tslib_1.__importDefault(require("qs"));
var tillhub_js_1 = require("../../src/tillhub-js");
var util_1 = require("../util");
dotenv.config();
var legacyId = '4564';
var searchTerm = 'asdf';
var query = {
    q: searchTerm,
    fields: ['city', 'name', 'branch_number']
};
var queryString = qs_1.default.stringify(query, { addQueryPrefix: true });
var mock = new axios_mock_adapter_1.default(axios_1.default);
afterEach(function () {
    mock.reset();
});
describe('v0: Branches: can search for branches', function () {
    it('receives a search query of type string', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var th, branches, data;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (process.env.SYSTEM_TEST !== 'true') {
                        mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(function () { return [
                            200,
                            {
                                token: '',
                                user: {
                                    id: '123',
                                    legacy_id: legacyId
                                }
                            }
                        ]; });
                        mock
                            .onGet("https://api.tillhub.com/api/v0/branches/" + legacyId + "/search?q=" + searchTerm)
                            .reply(function () { return [
                            200,
                            {
                                count: 1,
                                results: [{}]
                            }
                        ]; });
                    }
                    return [4 /*yield*/, util_1.initThInstance()];
                case 1:
                    th = _a.sent();
                    branches = th.branches();
                    expect(branches).toBeInstanceOf(tillhub_js_1.v0.Branches);
                    return [4 /*yield*/, branches.search(searchTerm)];
                case 2:
                    data = (_a.sent()).data;
                    expect(Array.isArray(data)).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
    it('receives a search query of type object', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var th, branches, data;
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
                            .onGet("https://api.tillhub.com/api/v0/branches/" + legacyId + "/search" + queryString)
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
                    branches = th.branches();
                    expect(branches).toBeInstanceOf(tillhub_js_1.v0.Branches);
                    return [4 /*yield*/, branches.search(query)];
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
                        mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(function () { return [
                            200,
                            {
                                token: '',
                                user: {
                                    id: '123',
                                    legacy_id: legacyId
                                }
                            }
                        ]; });
                        mock
                            .onGet("https://api.tillhub.com/api/v0/branches/" + legacyId + "/search?q=" + searchTerm)
                            .reply(function () { return [205]; });
                    }
                    return [4 /*yield*/, util_1.initThInstance()];
                case 1:
                    th = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, th.branches().search(searchTerm)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    expect(err_1.name).toBe('BranchesSearchFailed');
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=search.test.js.map