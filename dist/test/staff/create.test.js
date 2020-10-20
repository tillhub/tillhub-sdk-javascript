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
var mock = new axios_mock_adapter_1.default(axios_1.default);
afterEach(function () {
    mock.reset();
});
var staffMember = {
    firstname: 'asdf',
    lastname: 'asdf',
    displayname: 'asdf',
    phonenumbers: {
        home: 123456798
    },
    email: 'asdf',
    addresses: {
        street: 'qert',
        street_number: 12,
        region: 'DE',
        postal_code: 12345,
        country: 'Germany'
    },
    pin: 4567,
    metadata: {},
    scopes: ['asdf.qwert.zxcv'],
    staff_number: 7894,
    discounts: {},
    short_code: 7894,
    default: true
};
describe('v0: Staff: can create one staff member', function () {
    var query = {
        staff_id_template: '{country}{-}{branch}',
        generate_staff_id: true
    };
    it("Tillhub's staff are instantiable", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var th, Staff, _a, data, errors;
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
                            .onPost("https://api.tillhub.com/api/v0/staff/" + legacyId + "?" + qs_1.default.stringify(query))
                            .reply(function () {
                            return [
                                200,
                                {
                                    count: 1,
                                    results: [staffMember],
                                    errors: []
                                }
                            ];
                        });
                    }
                    return [4 /*yield*/, util_1.initThInstance()];
                case 1:
                    th = _b.sent();
                    Staff = th.staff();
                    expect(Staff).toBeInstanceOf(tillhub_js_1.v0.Staff);
                    return [4 /*yield*/, Staff.create(staffMember, query)];
                case 2:
                    _a = _b.sent(), data = _a.data, errors = _a.errors;
                    expect(data).toMatchObject(staffMember);
                    expect(errors).toEqual([]);
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
                        mock.onPost("https://api.tillhub.com/api/v0/staff/" + legacyId).reply(function () {
                            return [205];
                        });
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, util_1.initThInstance()];
                case 2:
                    th = _a.sent();
                    return [4 /*yield*/, th.staff().create(staffMember)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    expect(err_1.name).toBe('StaffMemberCreateFailed');
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=create.test.js.map