"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeFetchFailed = exports.Me = void 0;
var tslib_1 = require("tslib");
var errors_1 = require("../errors");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var Me = (function (_super) {
    tslib_1.__extends(Me, _super);
    function Me(options, http) {
        var _this = _super.call(this, http, {
            endpoint: Me.baseEndpoint,
            base: options.base || 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Me.baseEndpoint;
        _this.options.base = _this.options.base || 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    Me.prototype.get = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 && reject(new MeFetchFailed(undefined, { status: response.status }));
                        return [2, resolve({
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count },
                                errors: response.data.errors || []
                            })];
                    case 3:
                        error_1 = _a.sent();
                        return [2, reject(new MeFetchFailed(undefined, { error: error_1 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    Me.baseEndpoint = '/api/v0/me';
    return Me;
}(base_1.ThBaseHandler));
exports.Me = Me;
var MeFetchFailed = (function (_super) {
    tslib_1.__extends(MeFetchFailed, _super);
    function MeFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch me data'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'MeFetchFailed';
        Object.setPrototypeOf(_this, MeFetchFailed.prototype);
        return _this;
    }
    return MeFetchFailed;
}(errors_1.BaseError));
exports.MeFetchFailed = MeFetchFailed;
//# sourceMappingURL=me.js.map