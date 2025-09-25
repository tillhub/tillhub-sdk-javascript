"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
var tslib_1 = require("tslib");
var errors = tslib_1.__importStar(require("../errors"));
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var Email = (function (_super) {
    tslib_1.__extends(Email, _super);
    function Email(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: Email.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Email.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    Email.prototype.getMailjetConfiguration = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri('/mailjet-configuration');
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new errors.EmailCredentialsFetchFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results || null,
                                msg: response.data.msg,
                                status: response.data.status
                            }];
                    case 2:
                        error_1 = _a.sent();
                        throw new errors.EmailCredentialsFetchFailed(error_1.message, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    Email.prototype.setMailjetConfiguration = function (credentials) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri('/mailjet-configuration');
                        return [4, this.http.getClient().post(uri, credentials)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new errors.EmailCredentialsSetFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results,
                                msg: response.data.msg,
                                status: response.data.status
                            }];
                    case 2:
                        error_2 = _a.sent();
                        throw new errors.EmailCredentialsSetFailed(error_2.message, { error: error_2 });
                    case 3: return [2];
                }
            });
        });
    };
    Email.prototype.testCustomMailjet = function (request) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri('/test-custom-mailjet');
                        return [4, this.http.getClient().post(uri, request)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new errors.EmailTestCustomMailjetFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results,
                                msg: response.data.msg,
                                status: response.data.status
                            }];
                    case 2:
                        error_3 = _a.sent();
                        throw new errors.EmailTestCustomMailjetFailed(error_3.message, { error: error_3 });
                    case 3: return [2];
                }
            });
        });
    };
    Email.prototype.getCustomMailjetCredentialStatus = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri('/custom-mailjet-credential-status');
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new errors.EmailCustomMailjetCredentialStatusGetFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results,
                                msg: response.data.msg,
                                status: response.data.status
                            }];
                    case 2:
                        error_4 = _a.sent();
                        throw new errors.EmailCustomMailjetCredentialStatusGetFailed(error_4.message, { error: error_4 });
                    case 3: return [2];
                }
            });
        });
    };
    Email.baseEndpoint = '/api/v0/email';
    return Email;
}(base_1.ThBaseHandler));
exports.Email = Email;
//# sourceMappingURL=email.js.map