"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Images = void 0;
var tslib_1 = require("tslib");
var errors = tslib_1.__importStar(require("../errors"));
var uri_helper_1 = require("../uri-helper");
var Images = (function () {
    function Images(options, http) {
        var _a;
        this.options = options;
        this.http = http;
        this.endpoint = '/api/v0/images';
        this.options.base = (_a = this.options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com';
        this.uriHelper = new uri_helper_1.UriHelper(this.endpoint, this.options);
    }
    Images.prototype.put = function (query, payload) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_1;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri("/" + query.subsystem + "/" + query.prefix);
                        uri = this.uriHelper.generateUriWithQuery(base, {
                            acceptFormats: (_a = query.acceptFormats) !== null && _a !== void 0 ? _a : ['jpeg', 'png'],
                            metadata: (_b = query.metadata) !== null && _b !== void 0 ? _b : true,
                            flatten: query.flatten !== undefined ? query.flatten : null
                        });
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4, this.http
                                .getClient()
                                .put(uri, payload, { headers: { 'Content-Type': 'image/jpeg' } })];
                    case 2:
                        response = _c.sent();
                        return [2, {
                                data: response.data.results
                            }];
                    case 3:
                        error_1 = _c.sent();
                        throw new errors.ImagePutFailed();
                    case 4: return [2];
                }
            });
        });
    };
    Images.prototype.create = function (query, payload) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_2;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri("/" + query.subsystem + "/" + query.prefix);
                        uri = this.uriHelper.generateUriWithQuery(base, {
                            acceptFormats: (_a = query.acceptFormats) !== null && _a !== void 0 ? _a : ['jpeg', 'png'],
                            metadata: (_b = query.metadata) !== null && _b !== void 0 ? _b : true,
                            flatten: query.flatten !== undefined ? query.flatten : null
                        });
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4, this.http
                                .getClient()
                                .post(uri, payload, { headers: { 'Content-Type': 'image/jpeg' } })];
                    case 2:
                        response = _c.sent();
                        return [2, {
                                data: response.data.results
                            }];
                    case 3:
                        error_2 = _c.sent();
                        throw new errors.ImageCreationFailed();
                    case 4: return [2];
                }
            });
        });
    };
    return Images;
}());
exports.Images = Images;
//# sourceMappingURL=images.js.map