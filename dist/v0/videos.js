"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoPutFailed = exports.VideoCreationFailed = exports.Videos = void 0;
var tslib_1 = require("tslib");
var qs_1 = tslib_1.__importDefault(require("qs"));
var errors_1 = require("../errors");
var Videos = (function () {
    function Videos(options, http) {
        this.options = options;
        this.http = http;
        this.endpoint = '/api/v0/videos';
        this.options.base = this.options.base || 'https://api.tillhub.com';
    }
    Videos.prototype.put = function (query, payload) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + query.subsystem + "/" + query.prefix + qs_1.default.stringify({ ext: query.ext }, { addQueryPrefix: true });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http
                                .getClient()
                                .put(uri, payload, { timeout: 60000, headers: { 'Content-Type': 'multipart/form-data' } })];
                    case 2:
                        response = _a.sent();
                        return [2, resolve({
                                data: response.data.results
                            })];
                    case 3:
                        err_1 = _a.sent();
                        return [2, reject(new VideoPutFailed())];
                    case 4: return [2];
                }
            });
        }); });
    };
    Videos.prototype.create = function (query, payload) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, err_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + query.subsystem + "/" + query.prefix + qs_1.default.stringify({ ext: query.ext }, { addQueryPrefix: true });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, payload, {
                                timeout: 60000,
                                headers: { 'Content-Type': 'multipart/form-data' }
                            })];
                    case 2:
                        response = _a.sent();
                        return [2, resolve({
                                data: response.data.results
                            })];
                    case 3:
                        err_2 = _a.sent();
                        return [2, reject(new VideoCreationFailed())];
                    case 4: return [2];
                }
            });
        }); });
    };
    return Videos;
}());
exports.Videos = Videos;
var VideoCreationFailed = (function (_super) {
    tslib_1.__extends(VideoCreationFailed, _super);
    function VideoCreationFailed(message) {
        if (message === void 0) { message = 'Could not create new video'; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = 'VideoCreationFailed';
        Object.setPrototypeOf(_this, VideoCreationFailed.prototype);
        return _this;
    }
    return VideoCreationFailed;
}(errors_1.BaseError));
exports.VideoCreationFailed = VideoCreationFailed;
var VideoPutFailed = (function (_super) {
    tslib_1.__extends(VideoPutFailed, _super);
    function VideoPutFailed(message) {
        if (message === void 0) { message = 'Could not update new video'; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = 'VideoPutFailed';
        Object.setPrototypeOf(_this, VideoPutFailed.prototype);
        return _this;
    }
    return VideoPutFailed;
}(errors_1.BaseError));
exports.VideoPutFailed = VideoPutFailed;
//# sourceMappingURL=videos.js.map