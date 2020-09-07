"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchesSearchFailed = exports.ExternalCustomIdGetUniqueFailed = exports.BranchDeleteFailed = exports.BranchesCountFailed = exports.BranchCreationFailed = exports.BranchPutFailed = exports.BranchFetchFailed = exports.BranchesFetchFailed = exports.Branches = void 0;
var tslib_1 = require("tslib");
var just_typeof_1 = tslib_1.__importDefault(require("just-typeof"));
var qs_1 = tslib_1.__importDefault(require("qs"));
var just_safe_get_1 = tslib_1.__importDefault(require("just-safe-get"));
var errors_1 = require("../errors");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var Branches = (function (_super) {
    tslib_1.__extends(Branches, _super);
    function Branches(options, http) {
        var _this = _super.call(this, http, {
            endpoint: Branches.baseEndpoint,
            base: options.base || 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Branches.baseEndpoint;
        _this.options.base = _this.options.base || 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    Branches.prototype.getAll = function (queryOrOptions) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var next, uri, queryString, response_1, error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = void 0;
                        if (queryOrOptions && queryOrOptions.uri) {
                            uri = queryOrOptions.uri;
                        }
                        else {
                            queryString = '';
                            if (queryOrOptions && (queryOrOptions.query || queryOrOptions.limit)) {
                                queryString = qs_1.default.stringify(tslib_1.__assign({ limit: queryOrOptions.limit }, queryOrOptions.query));
                            }
                            uri = "" + this.options.base + this.endpoint + "/" + this.options.user + (queryString ? "?" + queryString : '');
                        }
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response_1 = _a.sent();
                        if (response_1.status !== 200) {
                            return [2, reject(new BranchesFetchFailed(undefined, { status: response_1.status }))];
                        }
                        if (response_1.data.cursor && response_1.data.cursor.next) {
                            next = function () { return _this.getAll({ uri: response_1.data.cursor.next }); };
                        }
                        return [2, resolve({
                                data: response_1.data.results,
                                metadata: { cursor: response_1.data.cursor },
                                next: next
                            })];
                    case 2:
                        error_1 = _a.sent();
                        return [2, reject(new BranchesFetchFailed(undefined, { error: error_1 }))];
                    case 3: return [2];
                }
            });
        }); });
    };
    Branches.prototype.get = function (branchId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + branchId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 &&
                            reject(new BranchFetchFailed(undefined, { status: response.status }));
                        return [2, resolve({
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_2 = _a.sent();
                        return [2, reject(new BranchFetchFailed(undefined, { error: error_2 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    Branches.prototype.put = function (branchId, branch) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + branchId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().put(uri, branch)];
                    case 2:
                        response = _a.sent();
                        return [2, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_3 = _a.sent();
                        return [2, reject(new BranchPutFailed(just_safe_get_1.default(error_3, 'response.data.msg'), { error: error_3 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    Branches.prototype.create = function (branch) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, branch)];
                    case 2:
                        response = _a.sent();
                        return [2, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_4 = _a.sent();
                        return [2, reject(new BranchCreationFailed(undefined, { error: error_4 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    Branches.prototype.count = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/meta";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2, reject(new BranchesCountFailed(undefined, { status: response.status }))];
                        }
                        return [2, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_5 = _a.sent();
                        return [2, reject(new BranchesCountFailed(undefined, { error: error_5 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    Branches.prototype.delete = function (branchId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + branchId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().delete(uri)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 && reject(new BranchDeleteFailed(just_safe_get_1.default(response, 'data.msg')));
                        return [2, resolve({
                                msg: response.data.msg
                            })];
                    case 3:
                        err_1 = _a.sent();
                        return [2, reject(new BranchDeleteFailed(just_safe_get_1.default(err_1, 'response.data.msg')))];
                    case 4: return [2];
                }
            });
        }); });
    };
    Branches.prototype.getUniqueExternalId = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var base, uri, response, error_6;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri("/external_id");
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 &&
                            reject(new ExternalCustomIdGetUniqueFailed(undefined, {
                                status: response.status
                            }));
                        return [2, resolve({
                                data: response.data.results,
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_6 = _a.sent();
                        if (error_6.response && error_6.response.status === 409) {
                            return [2, reject(new ExternalCustomIdGetUniqueFailed(undefined, {
                                    status: error_6.response.status,
                                    name: error_6.response.data.name
                                }))];
                        }
                        return [2, reject(new ExternalCustomIdGetUniqueFailed(undefined, { error: error_6 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    Branches.prototype.search = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, base, response, error_7;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof query === 'string') {
                            uri = this.uriHelper.generateBaseUri("/search?q=" + query);
                        }
                        else if (just_typeof_1.default(query) === 'object') {
                            base = this.uriHelper.generateBaseUri('/search');
                            uri = this.uriHelper.generateUriWithQuery(base, query);
                        }
                        else {
                            return [2, reject(new BranchesSearchFailed('Could not search for branch - query type is invalid'))];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 &&
                            reject(new BranchesSearchFailed(undefined, { status: response.status }));
                        return [2, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_7 = _a.sent();
                        return [2, reject(new BranchesSearchFailed(undefined, { error: error_7 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    Branches.baseEndpoint = '/api/v0/branches';
    return Branches;
}(base_1.ThBaseHandler));
exports.Branches = Branches;
var BranchesFetchFailed = (function (_super) {
    tslib_1.__extends(BranchesFetchFailed, _super);
    function BranchesFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch branches'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'BranchesFetchFailed';
        Object.setPrototypeOf(_this, BranchesFetchFailed.prototype);
        return _this;
    }
    return BranchesFetchFailed;
}(errors_1.BaseError));
exports.BranchesFetchFailed = BranchesFetchFailed;
var BranchFetchFailed = (function (_super) {
    tslib_1.__extends(BranchFetchFailed, _super);
    function BranchFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch branch'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'BrancheFetchFailed';
        Object.setPrototypeOf(_this, BranchFetchFailed.prototype);
        return _this;
    }
    return BranchFetchFailed;
}(errors_1.BaseError));
exports.BranchFetchFailed = BranchFetchFailed;
var BranchPutFailed = (function (_super) {
    tslib_1.__extends(BranchPutFailed, _super);
    function BranchPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter branch'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'BranchPutFailed';
        Object.setPrototypeOf(_this, BranchPutFailed.prototype);
        return _this;
    }
    return BranchPutFailed;
}(errors_1.BaseError));
exports.BranchPutFailed = BranchPutFailed;
var BranchCreationFailed = (function (_super) {
    tslib_1.__extends(BranchCreationFailed, _super);
    function BranchCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create branch'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'BranchCreationFailed';
        Object.setPrototypeOf(_this, BranchCreationFailed.prototype);
        return _this;
    }
    return BranchCreationFailed;
}(errors_1.BaseError));
exports.BranchCreationFailed = BranchCreationFailed;
var BranchesCountFailed = (function (_super) {
    tslib_1.__extends(BranchesCountFailed, _super);
    function BranchesCountFailed(message, properties) {
        if (message === void 0) { message = 'Could not count the branches'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'BranchesCountFailed';
        Object.setPrototypeOf(_this, BranchesCountFailed.prototype);
        return _this;
    }
    return BranchesCountFailed;
}(errors_1.BaseError));
exports.BranchesCountFailed = BranchesCountFailed;
var BranchDeleteFailed = (function (_super) {
    tslib_1.__extends(BranchDeleteFailed, _super);
    function BranchDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete branch'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'BranchDeleteFailed';
        Object.setPrototypeOf(_this, BranchDeleteFailed.prototype);
        return _this;
    }
    return BranchDeleteFailed;
}(errors_1.BaseError));
exports.BranchDeleteFailed = BranchDeleteFailed;
var ExternalCustomIdGetUniqueFailed = (function (_super) {
    tslib_1.__extends(ExternalCustomIdGetUniqueFailed, _super);
    function ExternalCustomIdGetUniqueFailed(message, properties) {
        if (message === void 0) { message = 'Could not get a unique external_custom_id'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ExternalCustomIdGetUniqueFailed';
        Object.setPrototypeOf(_this, ExternalCustomIdGetUniqueFailed.prototype);
        return _this;
    }
    return ExternalCustomIdGetUniqueFailed;
}(errors_1.BaseError));
exports.ExternalCustomIdGetUniqueFailed = ExternalCustomIdGetUniqueFailed;
var BranchesSearchFailed = (function (_super) {
    tslib_1.__extends(BranchesSearchFailed, _super);
    function BranchesSearchFailed(message, properties) {
        if (message === void 0) { message = 'Could not search for branch'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'BranchesSearchFailed';
        Object.setPrototypeOf(_this, BranchesSearchFailed.prototype);
        return _this;
    }
    return BranchesSearchFailed;
}(errors_1.BaseError));
exports.BranchesSearchFailed = BranchesSearchFailed;
//# sourceMappingURL=branches.js.map