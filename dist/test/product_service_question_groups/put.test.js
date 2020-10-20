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
var groupdId = '0505ce68-9cd9-4b0c-ac5c-7cb6804e8956';
var productServiceQuestionGroup = {
    name: 'Hair Treatment Questions',
    custom_id: 'ex1',
    description: 'All the questions about hair treatments like coloring',
    deleted: false,
    active: true,
    service_questions: [
        'c126c421-83ab-4020-8ec9-18fb279d535c',
        'b538ac9b-492c-4aa3-b8fc-bcbc67762c16'
    ]
};
describe('v0: Product Service Question Groups: can alter the group', function () {
    it("Tillhub's productServiceQuestionGroups are instantiable", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var th, productServiceQuestionGroups, data;
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
                            .onPut("https://api.tillhub.com/api/v0/product_service_question_groups/" + legacyId + "/" + groupdId)
                            .reply(function () {
                            return [
                                200,
                                {
                                    count: 1,
                                    results: [productServiceQuestionGroup]
                                }
                            ];
                        });
                    }
                    return [4 /*yield*/, util_1.initThInstance()];
                case 1:
                    th = _a.sent();
                    productServiceQuestionGroups = th.productServiceQuestionGroups();
                    expect(productServiceQuestionGroups).toBeInstanceOf(tillhub_js_1.v0.ProductServiceQuestionGroups);
                    return [4 /*yield*/, productServiceQuestionGroups.put(groupdId, productServiceQuestionGroup)];
                case 2:
                    data = (_a.sent()).data;
                    expect(data).toMatchObject(productServiceQuestionGroup);
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
                            .onPut("https://api.tillhub.com/api/v0/product_service_question_groups/" + legacyId + "/" + groupdId)
                            .reply(function () {
                            return [205];
                        });
                    }
                    return [4 /*yield*/, util_1.initThInstance()];
                case 1:
                    th = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, th.productServiceQuestionGroups().put(groupdId, productServiceQuestionGroup)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    expect(err_1.name).toBe('ProductServiceQuestionGroupsPutFailed');
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=put.test.js.map