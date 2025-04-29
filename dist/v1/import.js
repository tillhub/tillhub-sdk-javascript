"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportChunksFailed = exports.Import = void 0;
var tslib_1 = require("tslib");
var errors_1 = require("../errors");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var Import = (function (_super) {
    tslib_1.__extends(Import, _super);
    function Import(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: Import.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Import.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    Import.prototype.chunks = function (body) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri('/chunks');
                        return [4, this.http.getClient().post(uri, body)];
                    case 1:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results,
                                msg: response.data.msg
                            }];
                    case 2:
                        error_1 = _a.sent();
                        throw new ImportChunksFailed(error_1.message);
                    case 3: return [2];
                }
            });
        });
    };
    Import.baseEndpoint = '/api/v1/import';
    return Import;
}(base_1.ThBaseHandler));
exports.Import = Import;
var ImportChunksFailed = (function (_super) {
    tslib_1.__extends(ImportChunksFailed, _super);
    function ImportChunksFailed(message, properties) {
        if (message === void 0) { message = 'Could not import chunk'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ImportChunksFailed';
        Object.setPrototypeOf(_this, ImportChunksFailed.prototype);
        return _this;
    }
    return ImportChunksFailed;
}(errors_1.BaseError));
exports.ImportChunksFailed = ImportChunksFailed;
//# sourceMappingURL=import.js.map