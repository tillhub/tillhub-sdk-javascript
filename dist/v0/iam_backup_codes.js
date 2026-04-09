"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IamBackupCodesVerify2faFailed = exports.IamBackupCodes = void 0;
var tslib_1 = require("tslib");
var baseError_1 = require("../errors/baseError");
var base_1 = require("../base");
var IamBackupCodes = (function (_super) {
    tslib_1.__extends(IamBackupCodes, _super);
    function IamBackupCodes(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: IamBackupCodes.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = IamBackupCodes.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        return _this;
    }
    IamBackupCodes.prototype.verify2fa = function (tenantId) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_1;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        base = (_a = this.options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com';
                        uri = "" + base + this.endpoint + "/" + tenantId;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri)];
                    case 2:
                        response = _c.sent();
                        if (response.status !== 200) {
                            throw new IamBackupCodesVerify2faFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                success: (_b = response.data.success) !== null && _b !== void 0 ? _b : true
                            }];
                    case 3:
                        error_1 = _c.sent();
                        throw new IamBackupCodesVerify2faFailed(error_1.message, { error: error_1 });
                    case 4: return [2];
                }
            });
        });
    };
    IamBackupCodes.baseEndpoint = '/api/v0/iam/backup-codes';
    return IamBackupCodes;
}(base_1.ThBaseHandler));
exports.IamBackupCodes = IamBackupCodes;
var IamBackupCodesVerify2faFailed = (function (_super) {
    tslib_1.__extends(IamBackupCodesVerify2faFailed, _super);
    function IamBackupCodesVerify2faFailed(message, properties) {
        if (message === void 0) { message = 'Could not verify 2fa for backup codes'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'IamBackupCodesVerify2faFailed';
        Object.setPrototypeOf(_this, IamBackupCodesVerify2faFailed.prototype);
        return _this;
    }
    return IamBackupCodesVerify2faFailed;
}(baseError_1.BaseError));
exports.IamBackupCodesVerify2faFailed = IamBackupCodesVerify2faFailed;
//# sourceMappingURL=iam_backup_codes.js.map