"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditLogs = void 0;
var tslib_1 = require("tslib");
var errors = tslib_1.__importStar(require("../errors"));
var uri_helper_1 = require("../uri-helper");
var AuditLogs = (function () {
    function AuditLogs(options, http) {
        var _a;
        this.options = options;
        this.http = http;
        this.endpoint = '/api/v0/audits';
        this.options.base = (_a = this.options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com';
        this.uriHelper = new uri_helper_1.UriHelper(this.endpoint, this.options);
    }
    AuditLogs.prototype.getAll = function (q) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var next, base, uri, response_1, err_1;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/logs');
                        uri = this.uriHelper.generateUriWithQuery(base, q);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response_1 = _b.sent();
                        if ((_a = response_1.data.cursor) === null || _a === void 0 ? void 0 : _a.next) {
                            next = function () {
                                return _this.getAll(tslib_1.__assign(tslib_1.__assign({}, q), { uri: response_1.data.cursor.next }));
                            };
                        }
                        return [2, {
                                data: response_1.data.results,
                                metadata: { cursor: response_1.data.cursor },
                                next: next
                            }];
                    case 2:
                        err_1 = _b.sent();
                        throw new errors.AuditLogsFetchAllFailed();
                    case 3: return [2];
                }
            });
        });
    };
    AuditLogs.prototype.meta = function (q) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, err_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/logs/meta');
                        uri = this.uriHelper.generateUriWithQuery(base, q);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new errors.AuditLogsGetMetaFailed();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        err_2 = _a.sent();
                        throw new errors.AuditLogsGetMetaFailed();
                    case 3: return [2];
                }
            });
        });
    };
    AuditLogs.prototype.get = function (requestObject) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var auditLogId, query, base, uri, response, err_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        auditLogId = requestObject.auditLogId, query = requestObject.query;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        base = this.uriHelper.generateBaseUri("/logs/" + auditLogId);
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        err_3 = _a.sent();
                        throw new errors.AuditLogsFetchOneFailed();
                    case 4: return [2];
                }
            });
        });
    };
    return AuditLogs;
}());
exports.AuditLogs = AuditLogs;
//# sourceMappingURL=auditLogs.js.map