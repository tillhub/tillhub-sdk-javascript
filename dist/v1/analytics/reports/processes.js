"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsReportsV1ProcessesFetchError = exports.AnalyticsReportsProcesses = void 0;
var tslib_1 = require("tslib");
var base_1 = require("../../../base");
var errors_1 = require("../../../errors");
var uri_helper_1 = require("../../../uri-helper");
var AnalyticsReportsProcesses = (function (_super) {
    tslib_1.__extends(AnalyticsReportsProcesses, _super);
    function AnalyticsReportsProcesses(options, http) {
        var _this = _super.call(this, http, options) || this;
        _this.options = options;
        _this.http = http;
        return _this;
    }
    AnalyticsReportsProcesses.create = function (options, http) {
        return base_1.ThAnalyticsBaseHandler.generateAuthenticatedInstance(AnalyticsReportsProcesses, options, http);
    };
    AnalyticsReportsProcesses.prototype.getAll = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var localUriHelper, base, uri, response, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        localUriHelper = new uri_helper_1.UriHelper('/api/v1/analytics', this.options);
                        base = localUriHelper.generateBaseUri('/reports/processes');
                        uri = localUriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new AnalyticsReportsV1ProcessesFetchError();
                        return [2, {
                                data: response.data.results,
                                metadata: {
                                    count: response.data.count
                                }
                            }];
                    case 2:
                        err_1 = _a.sent();
                        throw new AnalyticsReportsV1ProcessesFetchError(undefined, { error: err_1 });
                    case 3: return [2];
                }
            });
        });
    };
    return AnalyticsReportsProcesses;
}(base_1.ThAnalyticsBaseHandler));
exports.AnalyticsReportsProcesses = AnalyticsReportsProcesses;
var AnalyticsReportsV1ProcessesFetchError = (function (_super) {
    tslib_1.__extends(AnalyticsReportsV1ProcessesFetchError, _super);
    function AnalyticsReportsV1ProcessesFetchError(message, properties) {
        if (message === void 0) { message = 'Could not fetch processes report'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'AnalyticsReportsV1ProcessesFetchError';
        Object.setPrototypeOf(_this, AnalyticsReportsV1ProcessesFetchError.prototype);
        return _this;
    }
    return AnalyticsReportsV1ProcessesFetchError;
}(errors_1.BaseError));
exports.AnalyticsReportsV1ProcessesFetchError = AnalyticsReportsV1ProcessesFetchError;
//# sourceMappingURL=processes.js.map