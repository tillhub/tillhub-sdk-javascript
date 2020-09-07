"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServiceQuestionGroups = void 0;
var tslib_1 = require("tslib");
var errors = tslib_1.__importStar(require("../errors/productServiceQuestionGroups"));
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var ProductServiceQuestionGroups = (function (_super) {
    tslib_1.__extends(ProductServiceQuestionGroups, _super);
    function ProductServiceQuestionGroups(options, http) {
        var _this = _super.call(this, http, {
            endpoint: ProductServiceQuestionGroups.baseEndpoint,
            base: options.base || 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = ProductServiceQuestionGroups.baseEndpoint;
        _this.options.base = _this.options.base || 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    ProductServiceQuestionGroups.prototype.getAll = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var next, base, uri, response_1, error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response_1 = _a.sent();
                        if (response_1.data.cursor && response_1.data.cursor.next) {
                            next = function () {
                                return _this.getAll({ uri: response_1.data.cursor.next });
                            };
                        }
                        return [2, resolve({
                                data: response_1.data.results,
                                metadata: { count: response_1.data.count, cursor: response_1.data.cursor },
                                next: next
                            })];
                    case 2:
                        error_1 = _a.sent();
                        return [2, reject(new errors.ProductServiceQuestionGroupsFetchAllFailed(undefined, { error: error_1 }))];
                    case 3: return [2];
                }
            });
        }); });
    };
    ProductServiceQuestionGroups.prototype.get = function (groupId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri("/" + groupId);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        response.status !== 200 &&
                            reject(new errors.ProductServiceQuestionGroupsFetchOneFailed(undefined, {
                                status: response.status
                            }));
                        return [2, resolve({
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            })];
                    case 2:
                        error_2 = _a.sent();
                        return [2, reject(new errors.ProductServiceQuestionGroupsFetchOneFailed(undefined, { error: error_2 }))];
                    case 3: return [2];
                }
            });
        }); });
    };
    ProductServiceQuestionGroups.prototype.meta = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri("/meta");
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            reject(new errors.ProductServiceQuestionGroupsGetMetaFailed());
                        return [2, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 2:
                        error_3 = _a.sent();
                        return [2, reject(new errors.ProductServiceQuestionGroupsGetMetaFailed(undefined, { error: error_3 }))];
                    case 3: return [2];
                }
            });
        }); });
    };
    ProductServiceQuestionGroups.prototype.create = function (productServiceQuestionGroup) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri();
                        return [4, this.http.getClient().post(uri, productServiceQuestionGroup)];
                    case 1:
                        response = _a.sent();
                        return [2, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 2:
                        error_4 = _a.sent();
                        return [2, reject(new errors.ProductServiceQuestionGroupsCreationFailed(undefined, { error: error_4 }))];
                    case 3: return [2];
                }
            });
        }); });
    };
    ProductServiceQuestionGroups.prototype.put = function (groupId, productServiceQuestionGroup) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri("/" + groupId);
                        return [4, this.http.getClient().put(uri, productServiceQuestionGroup)];
                    case 1:
                        response = _a.sent();
                        response.status !== 200 &&
                            reject(new errors.ProductServiceQuestionGroupsPutFailed(undefined, { status: response.status }));
                        return [2, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 2:
                        error_5 = _a.sent();
                        return [2, reject(new errors.ProductServiceQuestionGroupsPutFailed(undefined, { error: error_5 }))];
                    case 3: return [2];
                }
            });
        }); });
    };
    ProductServiceQuestionGroups.baseEndpoint = '/api/v0/product_service_question_groups';
    return ProductServiceQuestionGroups;
}(base_1.ThBaseHandler));
exports.ProductServiceQuestionGroups = ProductServiceQuestionGroups;
//# sourceMappingURL=product_service_question_groups.js.map