"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var dotenv = tslib_1.__importStar(require("dotenv"));
var axios_1 = tslib_1.__importDefault(require("axios"));
var axios_mock_adapter_1 = tslib_1.__importDefault(require("axios-mock-adapter"));
var pricebook_entries_1 = require("./../../src/v1/pricebook-entries");
var util_1 = require("../util");
dotenv.config();
var legacyId = '4564';
var mock = new axios_mock_adapter_1.default(axios_1.default);
afterEach(function () {
    mock.reset();
});
var pricebookEntryId = 'asdf5566';
var respMsg = "Deleted pricebook entry " + pricebookEntryId;
describe('v0: PricebookEntries: can delete a pricebook', function () {
    it("Tillhub's pricebook entries are instantiable", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var th, pricebookEntries, msg;
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
                            .onDelete("https://api.tillhub.com/api/v1/products/" + legacyId + "/prices/book/entry/" + pricebookEntryId)
                            .reply(function () {
                            return [
                                200,
                                {
                                    msg: respMsg
                                }
                            ];
                        });
                    }
                    return [4 /*yield*/, util_1.initThInstance()];
                case 1:
                    th = _a.sent();
                    pricebookEntries = th.products().pricebookEntries();
                    expect(pricebookEntries).toBeInstanceOf(pricebook_entries_1.PricebookEntries);
                    return [4 /*yield*/, pricebookEntries.delete(pricebookEntryId)];
                case 2:
                    msg = (_a.sent()).msg;
                    expect(msg).toEqual(respMsg);
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
                            .onDelete("https://api.tillhub.com/api/v1/products/" + legacyId + "/prices/book/entry/" + pricebookEntryId)
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
                    return [4 /*yield*/, th.products().pricebookEntries().delete(pricebookEntryId)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    expect(err_1.name).toBe('PricebookEntryDeleteFailed');
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=delete.test.js.map