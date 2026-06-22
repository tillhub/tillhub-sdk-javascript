"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientAccountConnectionsFetchFailed = exports.ClientAccounts = void 0;
var tslib_1 = require("tslib");
var baseError_1 = require("../errors/baseError");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var ClientAccounts = (function (_super) {
    tslib_1.__extends(ClientAccounts, _super);
    function ClientAccounts(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, { endpoint: ClientAccounts.baseEndpoint, base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com' }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = ClientAccounts.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    ClientAccounts.prototype.getConnections = function (clientAccountId) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base, uri, response, error_1;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        base = (_a = this.options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com';
                        uri = "" + base + this.endpoint + "/" + clientAccountId + "/connections";
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _b.sent();
                        if (response.status !== 200) {
                            throw new ClientAccountConnectionsFetchFailed(undefined, { status: response.status });
                        }
                        return [2, {
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            }];
                    case 3:
                        error_1 = _b.sent();
                        throw new ClientAccountConnectionsFetchFailed(error_1.message, { error: error_1 });
                    case 4: return [2];
                }
            });
        });
    };
    ClientAccounts.baseEndpoint = '/api/v0/client_accounts';
    return ClientAccounts;
}(base_1.ThBaseHandler));
exports.ClientAccounts = ClientAccounts;
var ClientAccountConnectionsFetchFailed = (function (_super) {
    tslib_1.__extends(ClientAccountConnectionsFetchFailed, _super);
    function ClientAccountConnectionsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch client account connections'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ClientAccountConnectionsFetchFailed';
        Object.setPrototypeOf(_this, ClientAccountConnectionsFetchFailed.prototype);
        return _this;
    }
    return ClientAccountConnectionsFetchFailed;
}(baseError_1.BaseError));
exports.ClientAccountConnectionsFetchFailed = ClientAccountConnectionsFetchFailed;
//# sourceMappingURL=client_accounts.js.map