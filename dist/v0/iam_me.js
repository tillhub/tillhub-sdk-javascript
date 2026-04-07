"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IamMeSetup2faActionFailed = exports.IamMeBackupCodes2faFailed = exports.IamMeFetchFailed = exports.IamMeClass = void 0;
var tslib_1 = require("tslib");
var baseError_1 = require("../errors/baseError");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var IamMeClass = (function (_super) {
    tslib_1.__extends(IamMeClass, _super);
    function IamMeClass(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, { endpoint: IamMeClass.baseEndpoint, base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com' }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = IamMeClass.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    IamMeClass.prototype.get = function (tenantId) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_1;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        base = (_a = this.options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com';
                        uri = "" + base + this.endpoint + "/" + tenantId;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _b.sent();
                        if (response.status !== 200) {
                            throw new IamMeFetchFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count },
                                errors: response.data.errors || []
                            }];
                    case 3:
                        error_1 = _b.sent();
                        throw new IamMeFetchFailed(error_1.message, { error: error_1 });
                    case 4: return [2];
                }
            });
        });
    };
    IamMeClass.prototype.backupCodes2fa = function (tenantId) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_2;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        base = (_a = this.options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com';
                        uri = "" + base + this.endpoint + "/" + tenantId + "/backup-codes/2fa";
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri)];
                    case 2:
                        response = _c.sent();
                        if (response.status !== 200) {
                            throw new IamMeBackupCodes2faFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                success: (_b = response.data.success) !== null && _b !== void 0 ? _b : true
                            }];
                    case 3:
                        error_2 = _c.sent();
                        throw new IamMeBackupCodes2faFailed(error_2.message, { error: error_2 });
                    case 4: return [2];
                }
            });
        });
    };
    IamMeClass.prototype.setup2faActionMe = function (tenantId) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_3;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        base = (_a = this.options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com';
                        uri = "" + base + this.endpoint + "/" + tenantId + "/reset-2fa";
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri)];
                    case 2:
                        response = _b.sent();
                        if (response.status !== 200) {
                            throw new IamMeSetup2faActionFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_3 = _b.sent();
                        throw new IamMeSetup2faActionFailed(error_3.message, { error: error_3 });
                    case 4: return [2];
                }
            });
        });
    };
    IamMeClass.baseEndpoint = '/api/v0/iam/me';
    return IamMeClass;
}(base_1.ThBaseHandler));
exports.IamMeClass = IamMeClass;
var IamMeFetchFailed = (function (_super) {
    tslib_1.__extends(IamMeFetchFailed, _super);
    function IamMeFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch iam me'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'IamMeFetchFailed';
        Object.setPrototypeOf(_this, IamMeFetchFailed.prototype);
        return _this;
    }
    return IamMeFetchFailed;
}(baseError_1.BaseError));
exports.IamMeFetchFailed = IamMeFetchFailed;
var IamMeBackupCodes2faFailed = (function (_super) {
    tslib_1.__extends(IamMeBackupCodes2faFailed, _super);
    function IamMeBackupCodes2faFailed(message, properties) {
        if (message === void 0) { message = 'Could not verify 2fa for backup codes'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'IamMeBackupCodes2faFailed';
        Object.setPrototypeOf(_this, IamMeBackupCodes2faFailed.prototype);
        return _this;
    }
    return IamMeBackupCodes2faFailed;
}(baseError_1.BaseError));
exports.IamMeBackupCodes2faFailed = IamMeBackupCodes2faFailed;
var IamMeSetup2faActionFailed = (function (_super) {
    tslib_1.__extends(IamMeSetup2faActionFailed, _super);
    function IamMeSetup2faActionFailed(message, properties) {
        if (message === void 0) { message = 'Could not setup 2fa action'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'IamMeSetup2faActionFailed';
        Object.setPrototypeOf(_this, IamMeSetup2faActionFailed.prototype);
        return _this;
    }
    return IamMeSetup2faActionFailed;
}(baseError_1.BaseError));
exports.IamMeSetup2faActionFailed = IamMeSetup2faActionFailed;
//# sourceMappingURL=iam_me.js.map