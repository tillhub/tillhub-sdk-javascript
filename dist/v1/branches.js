"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchesMetaFailed = exports.BranchesFetchFailed = exports.BranchFetchFailed = exports.Branches = void 0;
var tslib_1 = require("tslib");
var errors_1 = require("../errors");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var Branches = (function (_super) {
    tslib_1.__extends(Branches, _super);
    function Branches(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: Branches.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Branches.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    Branches.prototype.getAll = function (queryOrOptions) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var next, base, uri, response_1, error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, queryOrOptions);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response_1 = _b.sent();
                        if (response_1.status !== 200) {
                            throw new BranchesFetchFailed(undefined, { status: response_1.status });
                        }
                        if ((_a = response_1.data.cursor) === null || _a === void 0 ? void 0 : _a.next) {
                            next = function () { return _this.getAll({ uri: response_1.data.cursor.next }); };
                        }
                        return [2, {
                                data: response_1.data.results,
                                metadata: { cursor: response_1.data.cursor },
                                next: next
                            }];
                    case 2:
                        error_1 = _b.sent();
                        throw new BranchesFetchFailed(undefined, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    Branches.prototype.meta = function (queryOrOptions) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri('/meta');
                        uri = this.uriHelper.generateUriWithQuery(base, queryOrOptions);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new BranchesMetaFailed(undefined, { status: response.status });
                        }
                        if (!response.data.results[0]) {
                            throw new BranchesMetaFailed('could not get branches metadata unexpectedly');
                        }
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        err_1 = _a.sent();
                        throw new BranchesMetaFailed();
                    case 3: return [2];
                }
            });
        });
    };
    Branches.prototype.get = function (branchId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + branchId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new BranchFetchFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_2 = _a.sent();
                        throw new BranchFetchFailed(undefined, { error: error_2 });
                    case 4: return [2];
                }
            });
        });
    };
    Branches.baseEndpoint = '/api/v1/branches';
    return Branches;
}(base_1.ThBaseHandler));
exports.Branches = Branches;
var BranchFetchFailed = (function (_super) {
    tslib_1.__extends(BranchFetchFailed, _super);
    function BranchFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch branch'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'BranchFetchFailed';
        Object.setPrototypeOf(_this, BranchFetchFailed.prototype);
        return _this;
    }
    return BranchFetchFailed;
}(errors_1.BaseError));
exports.BranchFetchFailed = BranchFetchFailed;
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
var BranchesMetaFailed = (function (_super) {
    tslib_1.__extends(BranchesMetaFailed, _super);
    function BranchesMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch meta data for branches'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'BranchesMetaFailed';
        Object.setPrototypeOf(_this, BranchesMetaFailed.prototype);
        return _this;
    }
    return BranchesMetaFailed;
}(errors_1.BaseError));
exports.BranchesMetaFailed = BranchesMetaFailed;
//# sourceMappingURL=branches.js.map