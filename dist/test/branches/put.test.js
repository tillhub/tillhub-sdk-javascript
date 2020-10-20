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
var branchId = 'asdf5566';
var updateObject = {
    name: 'some branch name'
};
describe('v0: Branches: can alter a branch', function () {
    it("Tillhub's branches are instantiable", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
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
                        mock.onPut("https://api.tillhub.com/api/v0/branches/" + legacyId + "/" + branchId).reply(function () {
                            return [
                                200,
                                {
                                    count: 1,
                                    results: [updateObject]
                                }
                            ];
                        });
                    }
                    return [4 /*yield*/, util_1.initThInstance()];
                case 1:
                    th = _a.sent();
                    branches = th.branches();
                    expect(branches).toBeInstanceOf(tillhub_js_1.v0.Branches);
                    return [4 /*yield*/, branches.put(branchId, updateObject)];
                case 2:
                    data = (_a.sent()).data;
                    expect(data).toMatchObject(updateObject);
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
                        mock.onPut("https://api.tillhub.com/api/v0/branches/" + legacyId + "/" + branchId).reply(function () {
                            return [
                                400,
                                {
                                    msg: 'Branch could not be deleted because it has 2 active registers.'
                                }
                            ];
                        });
                    }
                    return [4 /*yield*/, util_1.initThInstance()];
                case 1:
                    th = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, th.branches().put(branchId, updateObject)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    expect(err_1.name).toBe('BranchPutFailed');
                    expect(err_1.message).toBe('Branch could not be deleted because it has 2 active registers.');
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=put.test.js.map