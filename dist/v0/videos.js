"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoPutFailed = exports.VideoCreationFailed = exports.Videos = void 0;
var tslib_1 = require("tslib");
var errors_1 = require("../errors");
var uri_helper_1 = require("../uri-helper");
var Videos = (function () {
    function Videos(options, http) {
        var _a;
        this.options = options;
        this.http = http;
        this.endpoint = '/api/v0/videos';
        this.options.base = (_a = this.options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com';
        this.uriHelper = new uri_helper_1.UriHelper(this.endpoint, this.options);
    }
    Videos.prototype.put = function (query, payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri("/" + query.subsystem + "/" + query.prefix);
                        uri = this.uriHelper.generateUriWithQuery(base, { ext: query.ext });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http
                                .getClient()
                                .put(uri, payload, { timeout: 60000, headers: { 'Content-Type': 'multipart/form-data' } })];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results
                            }];
                    case 3:
                        error_1 = _a.sent();
                        throw new VideoPutFailed(error_1.message, { error: error_1 });
                    case 4: return [2];
                }
            });
        });
    };
    Videos.prototype.create = function (query, payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri("/" + query.subsystem + "/" + query.prefix);
                        uri = this.uriHelper.generateUriWithQuery(base, { ext: query.ext });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, payload, {
                                timeout: 60000,
                                headers: { 'Content-Type': 'multipart/form-data' }
                            })];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                data: response.data.results
                            }];
                    case 3:
                        error_2 = _a.sent();
                        throw new VideoCreationFailed(error_2.message, { error: error_2 });
                    case 4: return [2];
                }
            });
        });
    };
    return Videos;
}());
exports.Videos = Videos;
var VideoCreationFailed = (function (_super) {
    tslib_1.__extends(VideoCreationFailed, _super);
    function VideoCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create new video'; }
        var _this = _super.call(this, message, properties) || this;
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
    function VideoPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not update new video'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'VideoPutFailed';
        Object.setPrototypeOf(_this, VideoPutFailed.prototype);
        return _this;
    }
    return VideoPutFailed;
}(errors_1.BaseError));
exports.VideoPutFailed = VideoPutFailed;
//# sourceMappingURL=videos.js.map