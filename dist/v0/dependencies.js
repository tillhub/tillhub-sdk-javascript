"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DependenciesFetchFailed = exports.Dependencies = void 0;
var tslib_1 = require("tslib");
var errors_1 = require("../errors");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var Dependencies = (function (_super) {
    tslib_1.__extends(Dependencies, _super);
    function Dependencies(options, http) {
        var _this = _super.call(this, http, {
            endpoint: Dependencies.baseEndpoint,
            base: options.base || 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Dependencies.baseEndpoint;
        _this.options.base = _this.options.base || 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    Dependencies.prototype.get = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var base, uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri('/');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 &&
                            reject(new DependenciesFetchFailed(undefined, { status: response.status }));
                        return [2, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_1 = _a.sent();
                        return [2, reject(new DependenciesFetchFailed(undefined, { error: error_1 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    Dependencies.baseEndpoint = '/api/v0/dependencies';
    return Dependencies;
}(base_1.ThBaseHandler));
exports.Dependencies = Dependencies;
var DependenciesFetchFailed = (function (_super) {
    tslib_1.__extends(DependenciesFetchFailed, _super);
    function DependenciesFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the dependencies'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'DependenciesFetchFailed';
        Object.setPrototypeOf(_this, DependenciesFetchFailed.prototype);
        return _this;
    }
    return DependenciesFetchFailed;
}(errors_1.BaseError));
exports.DependenciesFetchFailed = DependenciesFetchFailed;
//# sourceMappingURL=dependencies.js.map