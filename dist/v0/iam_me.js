"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IamMeFetchFailed = exports.IamMeClass = void 0;
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + tenantId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
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
                        error_1 = _a.sent();
                        throw new IamMeFetchFailed(error_1.message, { error: error_1 });
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
//# sourceMappingURL=iam_me.js.map