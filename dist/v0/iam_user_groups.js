"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IamUserGroupsFetchFailed = exports.IamUserGroups = void 0;
var tslib_1 = require("tslib");
var baseError_1 = require("../errors/baseError");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var IamUserGroups = (function (_super) {
    tslib_1.__extends(IamUserGroups, _super);
    function IamUserGroups(options, http) {
        var _a, _b;
        var _this = _super.call(this, http, { endpoint: IamUserGroups.baseEndpoint, base: (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com' }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = IamUserGroups.baseEndpoint;
        _this.options.base = (_b = _this.options.base) !== null && _b !== void 0 ? _b : 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    IamUserGroups.prototype.getAll = function (query) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var next, base, uri, response_1, error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response_1 = _b.sent();
                        if (response_1.status !== 200) {
                            throw new IamUserGroupsFetchFailed(undefined, { status: response_1.status });
                        }
                        if ((_a = response_1.data.cursors) === null || _a === void 0 ? void 0 : _a.after) {
                            next = function () { return _this.getAll({ uri: response_1.data.cursors.after }); };
                        }
                        return [2, {
                                data: response_1.data.results,
                                metadata: { cursor: response_1.data.cursors },
                                next: next
                            }];
                    case 3:
                        error_1 = _b.sent();
                        throw new IamUserGroupsFetchFailed(error_1.message, { error: error_1 });
                    case 4: return [2];
                }
            });
        });
    };
    IamUserGroups.baseEndpoint = '/api/v0/iam/user-groups';
    return IamUserGroups;
}(base_1.ThBaseHandler));
exports.IamUserGroups = IamUserGroups;
var IamUserGroupsFetchFailed = (function (_super) {
    tslib_1.__extends(IamUserGroupsFetchFailed, _super);
    function IamUserGroupsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch iam user group'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'IamUserGroupsFetchFailed';
        Object.setPrototypeOf(_this, IamUserGroupsFetchFailed.prototype);
        return _this;
    }
    return IamUserGroupsFetchFailed;
}(baseError_1.BaseError));
exports.IamUserGroupsFetchFailed = IamUserGroupsFetchFailed;
//# sourceMappingURL=iam_user_groups.js.map