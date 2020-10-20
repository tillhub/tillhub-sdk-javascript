"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var dotenv = tslib_1.__importStar(require("dotenv"));
var axios_1 = tslib_1.__importDefault(require("axios"));
var axios_mock_adapter_1 = tslib_1.__importDefault(require("axios-mock-adapter"));
var correspondences_1 = require("./../../src/v0/correspondences");
var util_1 = require("../util");
dotenv.config();
var legacyId = '4564';
var mock = new axios_mock_adapter_1.default(axios_1.default);
afterEach(function () {
    mock.reset();
});
var correspondence = {
    recipient: {
        address: {
            type: 'billing',
            lines: null,
            region: 'Berlin',
            street: 'Neue Flora Str',
            country: 'DE',
            locality: 'Berlin',
            postal_code: '11223',
            street_number: '28a'
        },
        company: 'Floristika',
        lastname: 'Schmidt',
        firstname: 'Annemarie'
    },
    customer: 'c0ec105d-df1c-47e4-81a5-9939ea95d968',
    status: 'sent'
};
describe('v0: Correspondence: can create one correspondence', function () {
    it("Tillhub's correspondences are instantiable", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var th, correspondences, data;
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
                        mock.onPost("https://api.tillhub.com/api/v0/correspondences/" + legacyId).reply(function () {
                            return [
                                200,
                                {
                                    count: 1,
                                    results: [correspondence]
                                }
                            ];
                        });
                    }
                    return [4 /*yield*/, util_1.initThInstance()];
                case 1:
                    th = _a.sent();
                    correspondences = th.correspondences();
                    expect(correspondences).toBeInstanceOf(correspondences_1.Correspondences);
                    return [4 /*yield*/, correspondences.create(correspondence)];
                case 2:
                    data = (_a.sent()).data;
                    expect(data).toMatchObject(correspondence);
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
                        mock.onPost("https://api.tillhub.com/api/v0/correspondences/" + legacyId).reply(function () {
                            return [205];
                        });
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, util_1.initThInstance()];
                case 2:
                    th = _a.sent();
                    return [4 /*yield*/, th.correspondences().create(correspondence)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    expect(err_1.name).toBe('CorrespondenceCreationFailed');
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=create.test.js.map