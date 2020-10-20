"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditActions = void 0;
var tslib_1 = require("tslib");
var errors = tslib_1.__importStar(require("../errors"));
var uri_helper_1 = require("../uri-helper");
var AuditActions = (function () {
    function AuditActions(options, http) {
        var _a;
        this.options = options;
        this.http = http;
        this.endpoint = '/api/v0/audits';
        this.options.base = (_a = this.options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com';
        this.uriHelper = new uri_helper_1.UriHelper(this.endpoint, this.options);
    }
    AuditActions.prototype.getAll = function (q) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var next, base, uri, response_1, err_1;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/actions');
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
                        throw new errors.AuditActionsFetchAllFailed();
                    case 3: return [2];
                }
            });
        });
    };
    AuditActions.prototype.meta = function (q) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, err_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/actions/meta');
                        uri = this.uriHelper.generateUriWithQuery(base, q);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new errors.AuditActionsGetMetaFailed();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        err_2 = _a.sent();
                        throw new errors.AuditActionsGetMetaFailed();
                    case 3: return [2];
                }
            });
        });
    };
    AuditActions.prototype.get = function (requestObject) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var auditActionId, query, base, uri, response, err_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        auditActionId = requestObject.auditActionId, query = requestObject.query;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        base = this.uriHelper.generateBaseUri("/actions/" + auditActionId);
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
                        throw new errors.AuditActionsFetchOneFailed();
                    case 4: return [2];
                }
            });
        });
    };
    AuditActions.prototype.create = function (body) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, err_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri('/actions');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, body)];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                msg: response.data.msg
                            }];
                    case 3:
                        err_4 = _a.sent();
                        throw new errors.AuditActionsCreateFailed();
                    case 4: return [2];
                }
            });
        });
    };
    AuditActions.prototype.getTypes = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, err_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/actions/types');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results
                            }];
                    case 2:
                        err_5 = _a.sent();
                        throw new errors.AuditActionsTypesFetchFailed();
                    case 3: return [2];
                }
            });
        });
    };
    return AuditActions;
}());
exports.AuditActions = AuditActions;
//# sourceMappingURL=auditActions.js.map