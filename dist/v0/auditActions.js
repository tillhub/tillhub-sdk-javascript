"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditActions = void 0;
var tslib_1 = require("tslib");
var errors = tslib_1.__importStar(require("../errors"));
var uri_helper_1 = require("../uri-helper");
var AuditActions = (function () {
    function AuditActions(options, http) {
        this.options = options;
        this.http = http;
        this.endpoint = '/api/v0/audits';
        this.options.base = this.options.base || 'https://api.tillhub.com';
        this.uriHelper = new uri_helper_1.UriHelper(this.endpoint, this.options);
    }
    AuditActions.prototype.getAll = function (q) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var next, base, uri, response_1, err_1;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/actions');
                        uri = this.uriHelper.generateUriWithQuery(base, q);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response_1 = _a.sent();
                        if (response_1.data.cursor && response_1.data.cursor.next) {
                            next = function () {
                                return _this.getAll(tslib_1.__assign(tslib_1.__assign({}, q), { uri: response_1.data.cursor.next }));
                            };
                        }
                        return [2, resolve({
                                data: response_1.data.results,
                                metadata: { cursor: response_1.data.cursor },
                                next: next
                            })];
                    case 2:
                        err_1 = _a.sent();
                        return [2, reject(new errors.AuditActionsFetchAllFailed())];
                    case 3: return [2];
                }
            });
        }); });
    };
    AuditActions.prototype.meta = function (q) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
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
                            reject(new errors.AuditActionsGetMetaFailed());
                        return [2, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 2:
                        err_2 = _a.sent();
                        return [2, reject(new errors.AuditActionsGetMetaFailed())];
                    case 3: return [2];
                }
            });
        }); });
    };
    AuditActions.prototype.get = function (requestObject) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
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
                        return [2, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        err_3 = _a.sent();
                        return [2, reject(new errors.AuditActionsFetchOneFailed())];
                    case 4: return [2];
                }
            });
        }); });
    };
    AuditActions.prototype.create = function (body) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, err_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/actions";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, body)];
                    case 2:
                        response = _a.sent();
                        return [2, resolve({
                                msg: response.data.msg
                            })];
                    case 3:
                        err_4 = _a.sent();
                        return [2, reject(new errors.AuditActionsCreateFailed())];
                    case 4: return [2];
                }
            });
        }); });
    };
    AuditActions.prototype.getTypes = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var base, uri, response, err_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri("/actions/types");
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        return [2, resolve({
                                data: response.data.results
                            })];
                    case 2:
                        err_5 = _a.sent();
                        return [2, reject(new errors.AuditActionsTypesFetchFailed())];
                    case 3: return [2];
                }
            });
        }); });
    };
    return AuditActions;
}());
exports.AuditActions = AuditActions;
//# sourceMappingURL=auditActions.js.map