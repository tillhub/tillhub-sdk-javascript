"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuppliersProductsRelationBulkDeleteFailed = exports.SuppliersProductsRelation = void 0;
var tslib_1 = require("tslib");
var errors_1 = require("../errors");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var SuppliersProductsRelation = (function (_super) {
    tslib_1.__extends(SuppliersProductsRelation, _super);
    function SuppliersProductsRelation(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: SuppliersProductsRelation.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = SuppliersProductsRelation.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    SuppliersProductsRelation.prototype.bulkDelete = function (body) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri('/bulk');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().delete(uri, {
                                data: body
                            })];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new SuppliersProductsRelationBulkDeleteFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg
                            }];
                    case 3:
                        error_1 = _a.sent();
                        throw new SuppliersProductsRelationBulkDeleteFailed(error_1.message, { error: error_1 });
                    case 4: return [2];
                }
            });
        });
    };
    SuppliersProductsRelation.baseEndpoint = '/api/v1/business-partner-products';
    return SuppliersProductsRelation;
}(base_1.ThBaseHandler));
exports.SuppliersProductsRelation = SuppliersProductsRelation;
var SuppliersProductsRelationBulkDeleteFailed = (function (_super) {
    tslib_1.__extends(SuppliersProductsRelationBulkDeleteFailed, _super);
    function SuppliersProductsRelationBulkDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not bulk delete the supplier and product relation'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'SuppliersProductsRelationBulkDeleteFailed';
        Object.setPrototypeOf(_this, SuppliersProductsRelationBulkDeleteFailed.prototype);
        return _this;
    }
    return SuppliersProductsRelationBulkDeleteFailed;
}(errors_1.BaseError));
exports.SuppliersProductsRelationBulkDeleteFailed = SuppliersProductsRelationBulkDeleteFailed;
//# sourceMappingURL=suppliers_products_relation.js.map