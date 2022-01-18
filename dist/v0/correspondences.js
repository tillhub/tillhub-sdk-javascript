"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorrespondenceCreationFailed = exports.CorrespondencePutFailed = exports.CorrespondenceFetchFailed = exports.CorrespondencesFetchFailed = exports.Correspondences = void 0;
var tslib_1 = require("tslib");
var errors_1 = require("../errors");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var Correspondences = (function (_super) {
    tslib_1.__extends(Correspondences, _super);
    function Correspondences(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: Correspondences.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Correspondences.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    Correspondences.prototype.getAll = function (query) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var next, base, uri, response_1, error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response_1 = _b.sent();
                        if (response_1.status !== 200) {
                            throw new CorrespondencesFetchFailed(undefined, { status: response_1.status });
                        }
                        if ((_a = response_1.data.cursor) === null || _a === void 0 ? void 0 : _a.next) {
                            next = function () {
                                return _this.getAll({ uri: response_1.data.cursor.next });
                            };
                        }
                        return [2, {
                                data: response_1.data.results,
                                metadata: { cursor: response_1.data.cursor },
                                next: next
                            }];
                    case 2:
                        error_1 = _b.sent();
                        throw new CorrespondencesFetchFailed(error_1.message, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    Correspondences.prototype.get = function (correspondenceId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + correspondenceId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new CorrespondenceFetchFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_2 = _a.sent();
                        throw new CorrespondenceFetchFailed(error_2.message, { error: error_2 });
                    case 4: return [2];
                }
            });
        });
    };
    Correspondences.prototype.put = function (correspondenceId, correspondence) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + correspondenceId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().put(uri, correspondence)];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_3 = _a.sent();
                        throw new CorrespondencePutFailed(error_3.message, { error: error_3 });
                    case 4: return [2];
                }
            });
        });
    };
    Correspondences.prototype.create = function (correspondence) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, correspondence)];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_4 = _a.sent();
                        throw new CorrespondenceCreationFailed(error_4.message, { error: error_4 });
                    case 4: return [2];
                }
            });
        });
    };
    Correspondences.baseEndpoint = '/api/v0/correspondences';
    return Correspondences;
}(base_1.ThBaseHandler));
exports.Correspondences = Correspondences;
var CorrespondencesFetchFailed = (function (_super) {
    tslib_1.__extends(CorrespondencesFetchFailed, _super);
    function CorrespondencesFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch Correspondences'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CorrespondencesFetchFailed';
        Object.setPrototypeOf(_this, CorrespondencesFetchFailed.prototype);
        return _this;
    }
    return CorrespondencesFetchFailed;
}(errors_1.BaseError));
exports.CorrespondencesFetchFailed = CorrespondencesFetchFailed;
var CorrespondenceFetchFailed = (function (_super) {
    tslib_1.__extends(CorrespondenceFetchFailed, _super);
    function CorrespondenceFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch correspondence'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CorrespondenceFetchFailed';
        Object.setPrototypeOf(_this, CorrespondenceFetchFailed.prototype);
        return _this;
    }
    return CorrespondenceFetchFailed;
}(errors_1.BaseError));
exports.CorrespondenceFetchFailed = CorrespondenceFetchFailed;
var CorrespondencePutFailed = (function (_super) {
    tslib_1.__extends(CorrespondencePutFailed, _super);
    function CorrespondencePutFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter correspondence'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CorrespondencePutFailed';
        Object.setPrototypeOf(_this, CorrespondencePutFailed.prototype);
        return _this;
    }
    return CorrespondencePutFailed;
}(errors_1.BaseError));
exports.CorrespondencePutFailed = CorrespondencePutFailed;
var CorrespondenceCreationFailed = (function (_super) {
    tslib_1.__extends(CorrespondenceCreationFailed, _super);
    function CorrespondenceCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create correspondence'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CorrespondenceCreationFailed';
        Object.setPrototypeOf(_this, CorrespondenceCreationFailed.prototype);
        return _this;
    }
    return CorrespondenceCreationFailed;
}(errors_1.BaseError));
exports.CorrespondenceCreationFailed = CorrespondenceCreationFailed;
//# sourceMappingURL=correspondences.js.map