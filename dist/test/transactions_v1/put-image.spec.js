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
var mockTransactionId = '516976d6-4912-4021-af8a-d7e6e4ebfa08';
var mock = new axios_mock_adapter_1.default(axios_1.default);
afterEach(function () {
    mock.reset();
});
var mockImage = {
    '1x': 'https://storage.googleapis.com/tillhub-api-private-images-staging/FE9900870C4D328/transactions/bd3d1812-db1c-45fe-3cde-05dafa985a6c_1x.png',
    '2x': 'https://storage.googleapis.com/tillhub-api-private-images-staging/FE9900870C4D328/transactions/bd3d1812-db1c-45fe-3cde-05dafa985a6c_2x.png',
    '3x': 'https://storage.googleapis.com/tillhub-api-private-images-staging/FE9900870C4D328/transactions/bd3d1812-db1c-45fe-3cde-05dafa985a6c_3x.png',
    original: 'https://storage.googleapis.com/tillhub-api-private-images-staging/FE9900870C4D328/transactions/bd3d1812-db1c-45fe-3cde-05dafa985a6c_original.png'
};
var updateObject = {
    id: mockTransactionId,
    images: mockImage
};
describe('v0: Transactions: can alter the image', function () {
    it("Tillhub's transactions are instantiable", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var th, transactions, data;
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
                            .onPut("https://api.tillhub.com/api/v1/transactions/" + legacyId + "/" + mockTransactionId + "/images")
                            .reply(function () {
                            return [
                                200,
                                {
                                    results: updateObject
                                }
                            ];
                        });
                    }
                    return [4 /*yield*/, util_1.initThInstance()];
                case 1:
                    th = _a.sent();
                    transactions = th.transactions();
                    expect(transactions).toBeInstanceOf(tillhub_js_1.v1.Transactions);
                    return [4 /*yield*/, transactions.putImage(mockTransactionId, mockImage)];
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
                        mock
                            .onPut("https://api.tillhub.com/api/v1/transactions/" + legacyId + "/" + mockTransactionId + "/images")
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
                    return [4 /*yield*/, th.transactions().putImage(mockTransactionId, mockImage)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    expect(err_1.name).toBe('TransactionsImagePutFailed');
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=put-image.spec.js.map