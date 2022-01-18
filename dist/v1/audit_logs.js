"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditLogs = void 0;
var tslib_1 = require("tslib");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var audit_logs_1 = require("../v0/audit_logs");
var AuditLogs = (function (_super) {
    tslib_1.__extends(AuditLogs, _super);
    function AuditLogs(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: AuditLogs.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = AuditLogs.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    AuditLogs.prototype.getAll = function (query) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var next, base, uri, response_1, error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/logs');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response_1 = _b.sent();
                        if ((_a = response_1.data.cursor) === null || _a === void 0 ? void 0 : _a.next) {
                            next = function () {
                                return _this.getAll({ uri: response_1.data.cursor.next });
                            };
                        }
                        return [2, {
                                data: response_1.data.results,
                                metadata: { count: response_1.data.count, cursor: response_1.data.cursor },
                                next: next
                            }];
                    case 2:
                        error_1 = _b.sent();
                        throw new audit_logs_1.AuditLogsFetchAllFailed(error_1.message, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    AuditLogs.baseEndpoint = '/api/v1/audits';
    return AuditLogs;
}(base_1.ThBaseHandler));
exports.AuditLogs = AuditLogs;
//# sourceMappingURL=audit_logs.js.map