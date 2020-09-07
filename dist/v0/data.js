"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataReplaceFailed = exports.DataCreateFailed = exports.Data = void 0;
var tslib_1 = require("tslib");
var errors_1 = require("../errors");
var Data = (function () {
    function Data(options, http) {
        this.options = options;
        this.http = http;
        this.endpoint = '/api/v0/data';
        this.options.base = this.options.base || 'https://api.tillhub.com';
    }
    Data.prototype.replace = function (dataId, payload) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + dataId;
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
                        return [2, reject(new DataReplaceFailed())];
                    case 4: return [2];
                }
            });
        }); });
    };
    Data.prototype.create = function (payload) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, err_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user;
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
                        return [2, reject(new DataCreateFailed())];
                    case 4: return [2];
                }
            });
        }); });
    };
    return Data;
}());
exports.Data = Data;
var DataCreateFailed = (function (_super) {
    tslib_1.__extends(DataCreateFailed, _super);
    function DataCreateFailed(message) {
        if (message === void 0) { message = 'Could not create data'; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = 'DataCreateFailed';
        Object.setPrototypeOf(_this, DataCreateFailed.prototype);
        return _this;
    }
    return DataCreateFailed;
}(errors_1.BaseError));
exports.DataCreateFailed = DataCreateFailed;
var DataReplaceFailed = (function (_super) {
    tslib_1.__extends(DataReplaceFailed, _super);
    function DataReplaceFailed(message) {
        if (message === void 0) { message = 'Could not replace data'; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = 'DataReplaceFailed';
        Object.setPrototypeOf(_this, DataReplaceFailed.prototype);
        return _this;
    }
    return DataReplaceFailed;
}(errors_1.BaseError));
exports.DataReplaceFailed = DataReplaceFailed;
//# sourceMappingURL=data.js.map