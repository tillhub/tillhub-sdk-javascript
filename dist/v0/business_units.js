"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessUnitsFetchFailed = exports.BusinessUnits = void 0;
var tslib_1 = require("tslib");
var errors_1 = require("../errors");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var BusinessUnits = (function (_super) {
    tslib_1.__extends(BusinessUnits, _super);
    function BusinessUnits(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: BusinessUnits.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = BusinessUnits.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    BusinessUnits.prototype.getAll = function (query) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var next, base, uri, response_1, error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response_1 = _b.sent();
                        if (response_1.status !== 200) {
                            throw new BusinessUnitsFetchFailed(undefined, { status: response_1.status });
                        }
                        if ((_a = response_1.data.cursor) === null || _a === void 0 ? void 0 : _a.next) {
                            next = function () { return _this.getAll({ uri: response_1.data.cursor.next }); };
                        }
                        return [2, {
                                data: response_1.data.results,
                                metadata: { cursor: response_1.data.cursor },
                                next: next
                            }];
                    case 3:
                        error_1 = _b.sent();
                        throw new BusinessUnitsFetchFailed(error_1.message, { error: error_1 });
                    case 4: return [2];
                }
            });
        });
    };
    BusinessUnits.baseEndpoint = '/api/v0/business-units';
    return BusinessUnits;
}(base_1.ThBaseHandler));
exports.BusinessUnits = BusinessUnits;
var BusinessUnitsFetchFailed = (function (_super) {
    tslib_1.__extends(BusinessUnitsFetchFailed, _super);
    function BusinessUnitsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch business units'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'BusinessUnitsFetchFailed';
        Object.setPrototypeOf(_this, BusinessUnitsFetchFailed.prototype);
        return _this;
    }
    return BusinessUnitsFetchFailed;
}(errors_1.BaseError));
exports.BusinessUnitsFetchFailed = BusinessUnitsFetchFailed;
//# sourceMappingURL=business_units.js.map