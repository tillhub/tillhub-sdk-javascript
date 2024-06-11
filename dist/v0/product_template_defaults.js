"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductTemplateDefaultsFetchFailed = exports.ProductTemplateDefaults = void 0;
var tslib_1 = require("tslib");
var errors_1 = require("../errors");
var uri_helper_1 = require("../uri-helper");
var ProductTemplateDefaults = (function () {
    function ProductTemplateDefaults(options, http) {
        var _a;
        this.options = options;
        this.http = http;
        this.endpoint = '/api/v0/statics/default_variants';
        this.options.user = '';
        this.options.base = (_a = this.options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com';
        this.uriHelper = new uri_helper_1.UriHelper(this.endpoint, this.options);
    }
    ProductTemplateDefaults.prototype.getAll = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri();
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new ProductTemplateDefaultsFetchFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        error_1 = _a.sent();
                        throw new ProductTemplateDefaultsFetchFailed(error_1.message, { error: error_1 });
                    case 3: return [2];
                }
            });
        });
    };
    return ProductTemplateDefaults;
}());
exports.ProductTemplateDefaults = ProductTemplateDefaults;
var ProductTemplateDefaultsFetchFailed = (function (_super) {
    tslib_1.__extends(ProductTemplateDefaultsFetchFailed, _super);
    function ProductTemplateDefaultsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch product template defaults'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductTemplateDefaultsFetchFailed';
        Object.setPrototypeOf(_this, ProductTemplateDefaultsFetchFailed.prototype);
        return _this;
    }
    return ProductTemplateDefaultsFetchFailed;
}(errors_1.BaseError));
exports.ProductTemplateDefaultsFetchFailed = ProductTemplateDefaultsFetchFailed;
//# sourceMappingURL=product_template_defaults.js.map