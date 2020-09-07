"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Images = void 0;
var tslib_1 = require("tslib");
var errors = tslib_1.__importStar(require("../errors"));
var Images = (function () {
    function Images(options, http) {
        this.options = options;
        this.http = http;
        this.endpoint = '/api/v0/images';
        this.options.base = this.options.base || 'https://api.tillhub.com';
    }
    Images.prototype.put = function (query, payload) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + query.subsystem + "/" + query.prefix;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http
                                .getClient()
                                .put(uri, payload, { headers: { 'Content-Type': 'image/jpeg' } })];
                    case 2:
                        response = _a.sent();
                        return [2, resolve({
                                data: response.data.results
                            })];
                    case 3:
                        err_1 = _a.sent();
                        return [2, reject(new errors.ImagePutFailed())];
                    case 4: return [2];
                }
            });
        }); });
    };
    Images.prototype.create = function (query, payload) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, err_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + query.subsystem + "/" + query.prefix;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http
                                .getClient()
                                .post(uri, payload, { headers: { 'Content-Type': 'image/jpeg' } })];
                    case 2:
                        response = _a.sent();
                        return [2, resolve({
                                data: response.data.results
                            })];
                    case 3:
                        err_2 = _a.sent();
                        return [2, reject(new errors.ImageCreationFailed())];
                    case 4: return [2];
                }
            });
        }); });
    };
    return Images;
}());
exports.Images = Images;
//# sourceMappingURL=images.js.map