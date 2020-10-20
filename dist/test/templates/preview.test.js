"use strict";
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var dotenv = tslib_1.__importStar(require("dotenv"));
var axios_1 = tslib_1.__importDefault(require("axios"));
var axios_mock_adapter_1 = tslib_1.__importDefault(require("axios-mock-adapter"));
var tillhub_js_1 = tslib_1.__importStar(require("../../src/tillhub-js"));
dotenv.config();
var user = {
    username: 'test@example.com',
    password: '12345678',
    clientAccount: 'someuuid',
    apiKey: '12345678'
};
if (process.env.SYSTEM_TEST) {
    user.username = (_a = process.env.SYSTEM_TEST_USERNAME) !== null && _a !== void 0 ? _a : user.username;
    user.password = (_b = process.env.SYSTEM_TEST_PASSWORD) !== null && _b !== void 0 ? _b : user.password;
    user.clientAccount = (_c = process.env.SYSTEM_TEST_CLIENT_ACCOUNT_ID) !== null && _c !== void 0 ? _c : user.clientAccount;
    user.apiKey = (_d = process.env.SYSTEM_TEST_API_KEY) !== null && _d !== void 0 ? _d : user.apiKey;
}
var requestObject = {
    query: {
        format: 'uri'
    },
    body: {
        paper_size: 'Letter',
        title: 'Something else',
        addresses: {
            self: {
                enabled: false
            }
        },
        main_text: 'This is some custom main text...',
        attention: 'new attention',
        font_color: '#FF0000',
        font: 'monospace'
    },
    templateId: '123abc'
};
var legacyId = '4564';
var mock = new axios_mock_adapter_1.default(axios_1.default);
afterEach(function () {
    mock.reset();
});
describe('v0: Templates', function () {
    it('can create a preview for one template', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var body, templateId, options, template, data;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    body = requestObject.body, templateId = requestObject.templateId;
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
                            .onPost("https://api.tillhub.com/api/v1/templates/" + legacyId + "/" + templateId + "/preview?format=uri")
                            .reply(function () {
                            return [
                                200,
                                {
                                    results: body
                                }
                            ];
                        });
                    }
                    options = {
                        credentials: {
                            username: user.username,
                            password: user.password
                        },
                        base: process.env.TILLHUB_BASE
                    };
                    tillhub_js_1.default.init(options);
                    return [4 /*yield*/, tillhub_js_1.default.auth.loginUsername({
                            username: user.username,
                            password: user.password
                        })];
                case 1:
                    _a.sent();
                    template = tillhub_js_1.default.templates();
                    expect(template).toBeInstanceOf(tillhub_js_1.v1.Templates);
                    return [4 /*yield*/, template.preview(requestObject)];
                case 2:
                    data = (_a.sent()).data;
                    expect(data).toEqual(body);
                    return [2 /*return*/];
            }
        });
    }); });
    it('rejects on status codes that are not 200', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var templateId, options, err_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (process.env.SYSTEM_TEST !== 'true') {
                        templateId = requestObject.templateId;
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
                            .onPost("https://api.tillhub.com/api/v1/templates/" + legacyId + "/" + templateId + "/preview?format=uri")
                            .reply(function () {
                            return [400];
                        });
                    }
                    options = {
                        credentials: {
                            username: user.username,
                            password: user.password
                        },
                        base: process.env.TILLHUB_BASE
                    };
                    tillhub_js_1.default.init(options);
                    return [4 /*yield*/, tillhub_js_1.default.auth.loginUsername({
                            username: user.username,
                            password: user.password
                        })];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, tillhub_js_1.default.templates().preview(requestObject)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    expect(err_1.name).toBe('TemplatesPreviewFailed');
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=preview.test.js.map