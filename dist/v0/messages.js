"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Messages = void 0;
var tslib_1 = require("tslib");
var errors = tslib_1.__importStar(require("../errors"));
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var Messages = (function (_super) {
    tslib_1.__extends(Messages, _super);
    function Messages(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, {
            endpoint: Messages.baseEndpoint,
            base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Messages.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    Messages.prototype.getAll = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new errors.MessagesFetchFailed();
                        return [2, {
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        err_1 = _a.sent();
                        throw new errors.MessagesFetchFailed();
                    case 3: return [2];
                }
            });
        });
    };
    Messages.prototype.update = function (messageId, messageRequest) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uri, response, err_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = this.uriHelper.generateBaseUri("/" + messageId);
                        return [4, this.http.getClient().put(uri, messageRequest)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new errors.MessagesUpdateFailed();
                        return [2, {
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            }];
                    case 2:
                        err_2 = _a.sent();
                        throw new errors.MessagesUpdateFailed();
                    case 3: return [2];
                }
            });
        });
    };
    Messages.baseEndpoint = '/api/v0/messages';
    return Messages;
}(base_1.ThBaseHandler));
exports.Messages = Messages;
//# sourceMappingURL=messages.js.map