"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportsV1 = void 0;
var tslib_1 = require("tslib");
var uri_helper_1 = require("../uri-helper");
var exports_1 = require("../v0/exports");
var ExportsV1 = (function () {
    function ExportsV1(options, http) {
        var _a;
        this.options = options;
        this.http = http;
        this.endpoint = '/api/v1/exports';
        this.options.base = (_a = this.options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com';
        this.uriHelper = new uri_helper_1.UriHelper(this.endpoint, this.options);
    }
    ExportsV1.prototype.gobd = function (gobdQuery, queryOrOptions) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/gobd');
                        uri = this.uriHelper.generateUriWithQuery(base, queryOrOptions);
                        return [4, this.http.getClient().post(uri, gobdQuery)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new exports_1.ExportsGobdFetchFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results,
                                metadata: {}
                            }];
                    case 2:
                        error_1 = _a.sent();
                        throw new exports_1.ExportsGobdFetchFailed(undefined, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    return ExportsV1;
}());
exports.ExportsV1 = ExportsV1;
//# sourceMappingURL=exports.js.map