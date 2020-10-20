"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var dotenv = tslib_1.__importStar(require("dotenv"));
var axios_1 = tslib_1.__importDefault(require("axios"));
var axios_mock_adapter_1 = tslib_1.__importDefault(require("axios-mock-adapter"));
var user_permissions_templates_1 = require("../../src/v0/user_permissions_templates");
var util_1 = require("../util");
dotenv.config();
var legacyId = '4564';
var templateId = '1337';
var mockUserPermissionsTemplate = {
    name: 'TheBestTemplateInTheWholeWorld',
    scopes: ['first:scope', 'second:scope']
};
var mockMsg = "Deleted template " + templateId;
var mock = new axios_mock_adapter_1.default(axios_1.default);
afterEach(function () {
    mock.reset();
});
describe('v0: UserPermissionsTemplates', function () {
    it('retrieves all userPermissionsTemplates', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var th, userPermissionsTemplates, data;
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
                            .onGet("https://api.tillhub.com/api/v0/user_permission_templates/" + legacyId)
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
                    userPermissionsTemplates = th.userPermissionsTemplates();
                    expect(userPermissionsTemplates).toBeInstanceOf(user_permissions_templates_1.UserPermissionsTemplates);
                    return [4 /*yield*/, userPermissionsTemplates.getAll()];
                case 2:
                    data = (_a.sent()).data;
                    expect(Array.isArray(data)).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
    it('retrieves one user permissions template', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var th, userPermissionsTemplates, data;
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
                            .onGet("https://api.tillhub.com/api/v0/user_permission_templates/" + legacyId + "/" + templateId)
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
                    userPermissionsTemplates = th.userPermissionsTemplates();
                    expect(userPermissionsTemplates).toBeInstanceOf(user_permissions_templates_1.UserPermissionsTemplates);
                    return [4 /*yield*/, userPermissionsTemplates.get(templateId)];
                case 2:
                    data = (_a.sent()).data;
                    expect(Array.isArray(data)).toBe(false);
                    return [2 /*return*/];
            }
        });
    }); });
    it('creates one user permissions template', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var th, userPermissionsTemplates, data;
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
                            .onPost("https://api.tillhub.com/api/v0/user_permission_templates/" + legacyId)
                            .reply(function () {
                            return [
                                200,
                                {
                                    count: 1,
                                    results: [mockUserPermissionsTemplate]
                                }
                            ];
                        });
                    }
                    return [4 /*yield*/, util_1.initThInstance()];
                case 1:
                    th = _a.sent();
                    userPermissionsTemplates = th.userPermissionsTemplates();
                    expect(userPermissionsTemplates).toBeInstanceOf(user_permissions_templates_1.UserPermissionsTemplates);
                    return [4 /*yield*/, userPermissionsTemplates.create(mockUserPermissionsTemplate)];
                case 2:
                    data = (_a.sent()).data;
                    expect(data).toEqual(mockUserPermissionsTemplate);
                    return [2 /*return*/];
            }
        });
    }); });
    it('updates one user permissions template', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var th, userPermissionsTemplates, data;
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
                            .onPut("https://api.tillhub.com/api/v0/user_permission_templates/" + legacyId + "/" + templateId)
                            .reply(function () {
                            return [
                                200,
                                {
                                    count: 1,
                                    results: [mockUserPermissionsTemplate]
                                }
                            ];
                        });
                    }
                    return [4 /*yield*/, util_1.initThInstance()];
                case 1:
                    th = _a.sent();
                    userPermissionsTemplates = th.userPermissionsTemplates();
                    expect(userPermissionsTemplates).toBeInstanceOf(user_permissions_templates_1.UserPermissionsTemplates);
                    return [4 /*yield*/, userPermissionsTemplates.update(templateId, mockUserPermissionsTemplate)];
                case 2:
                    data = (_a.sent()).data;
                    expect(data).toEqual(mockUserPermissionsTemplate);
                    return [2 /*return*/];
            }
        });
    }); });
    it('deletes one user permissions template', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var th, userPermissionsTemplates, msg;
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
                            .onDelete("https://api.tillhub.com/api/v0/user_permission_templates/" + legacyId + "/" + templateId)
                            .reply(function () {
                            return [
                                200,
                                {
                                    msg: mockMsg
                                }
                            ];
                        });
                    }
                    return [4 /*yield*/, util_1.initThInstance()];
                case 1:
                    th = _a.sent();
                    userPermissionsTemplates = th.userPermissionsTemplates();
                    expect(userPermissionsTemplates).toBeInstanceOf(user_permissions_templates_1.UserPermissionsTemplates);
                    return [4 /*yield*/, userPermissionsTemplates.delete(templateId)];
                case 2:
                    msg = (_a.sent()).msg;
                    expect(msg).toEqual(mockMsg);
                    return [2 /*return*/];
            }
        });
    }); });
    it('rejects getAll() if status code is not 200', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var th, e_1;
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
                            .onGet("https://api.tillhub.com/api/v0/user_permission_templates/" + legacyId)
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
                    return [4 /*yield*/, th.userPermissionsTemplates().getAll()];
                case 3:
                    _a.sent();
                    fail('should throw an error');
                    return [3 /*break*/, 5];
                case 4:
                    e_1 = _a.sent();
                    expect(e_1.name).toEqual(user_permissions_templates_1.UserPermissionsTemplatesFetchFailed.name);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
    it('rejects get() if status code is not 200', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var th, e_2;
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
                            .onGet("https://api.tillhub.com/api/v0/user_permission_templates/" + legacyId + "/" + templateId)
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
                    return [4 /*yield*/, th.userPermissionsTemplates().get(templateId)];
                case 3:
                    _a.sent();
                    fail('should throw an error');
                    return [3 /*break*/, 5];
                case 4:
                    e_2 = _a.sent();
                    expect(e_2.name).toEqual(user_permissions_templates_1.UserPermissionsTemplatesFetchOneFailed.name);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
    it('rejects create() if status code is not 200', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var th, e_3;
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
                            .onPost("https://api.tillhub.com/api/v0/user_permission_templates/" + legacyId + "/" + templateId)
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
                    return [4 /*yield*/, th.userPermissionsTemplates().create(mockUserPermissionsTemplate)];
                case 3:
                    _a.sent();
                    fail('should throw an error');
                    return [3 /*break*/, 5];
                case 4:
                    e_3 = _a.sent();
                    expect(e_3.name).toEqual(user_permissions_templates_1.UserPermissionsTemplatesCreationFailed.name);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
    it('rejects update() if status code is not 200', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var th, e_4;
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
                            .onPatch("https://api.tillhub.com/api/v0/user_permission_templates/" + legacyId + "/" + templateId)
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
                    return [4 /*yield*/, th.userPermissionsTemplates().update(templateId, mockUserPermissionsTemplate)];
                case 3:
                    _a.sent();
                    fail('should throw an error');
                    return [3 /*break*/, 5];
                case 4:
                    e_4 = _a.sent();
                    expect(e_4.name).toEqual(user_permissions_templates_1.UserPermissionsTemplatesUpdateFailed.name);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
    it('rejects delete() if status code is not 200', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var th, e_5;
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
                            .onDelete("https://api.tillhub.com/api/v0/user_permission_templates/" + legacyId + "/" + templateId)
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
                    return [4 /*yield*/, th.userPermissionsTemplates().delete(templateId)];
                case 3:
                    _a.sent();
                    fail('should throw an error');
                    return [3 /*break*/, 5];
                case 4:
                    e_5 = _a.sent();
                    expect(e_5.name).toEqual(user_permissions_templates_1.UserPermissionsTemplatesDeleteFailed.name);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=user-permissions-templates.test.js.map