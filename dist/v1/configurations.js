"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Configurations = void 0;
var tslib_1 = require("tslib");
var errors = tslib_1.__importStar(require("../errors"));
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var Configurations = (function (_super) {
    tslib_1.__extends(Configurations, _super);
    function Configurations(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: Configurations.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Configurations.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        _this.http.setDefaults({ headers: { 'Content-Type': 'application/json-patch+json' } });
        return _this;
    }
    Configurations.prototype.patch = function (configurationId, configuration) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + configurationId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().patch(uri, configuration)];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_1 = _a.sent();
                        throw new errors.ConfigurationPatchFailed(error_1.message, { error: error_1 });
                    case 4: return [2];
                }
            });
        });
    };
    Configurations.baseEndpoint = '/api/v1/configurations';
    return Configurations;
}(base_1.ThBaseHandler));
exports.Configurations = Configurations;
//# sourceMappingURL=configurations.js.map