"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceCreationFailed = exports.Services = void 0;
var tslib_1 = require("tslib");
var uri_helper_1 = require("../uri-helper");
var baseError_1 = require("../errors/baseError");
var base_1 = require("../base");
var Services = (function (_super) {
    tslib_1.__extends(Services, _super);
    function Services(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: Services.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Services.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    Services.prototype.create = function (service) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, service)];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_1 = _a.sent();
                        throw new ServiceCreationFailed(error_1.message, { error: error_1 });
                    case 4: return [2];
                }
            });
        });
    };
    Services.baseEndpoint = '/api/v0/services';
    return Services;
}(base_1.ThBaseHandler));
exports.Services = Services;
var ServiceCreationFailed = (function (_super) {
    tslib_1.__extends(ServiceCreationFailed, _super);
    function ServiceCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create the service'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ServiceCreationFailed';
        Object.setPrototypeOf(_this, ServiceCreationFailed.prototype);
        return _this;
    }
    return ServiceCreationFailed;
}(baseError_1.BaseError));
exports.ServiceCreationFailed = ServiceCreationFailed;
//# sourceMappingURL=services.js.map