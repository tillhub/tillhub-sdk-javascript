"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UriHelper = void 0;
var tslib_1 = require("tslib");
var qs_1 = tslib_1.__importDefault(require("qs"));
var UriHelper = (function () {
    function UriHelper(endpoint, options) {
        var _a;
        var base = (_a = options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com';
        var user = options.user ? "/" + options.user : '';
        this.baseUri = "" + base + endpoint + user;
    }
    UriHelper.prototype.generateBaseUri = function (path) {
        var additionalPath = path !== null && path !== void 0 ? path : '';
        return "" + this.baseUri + additionalPath;
    };
    UriHelper.prototype.generateUriWithQuery = function (basePath, query) {
        var _a, _b, _c;
        if (!query)
            return "" + basePath;
        if ((_a = query.uri) !== null && _a !== void 0 ? _a : ((_b = query === null || query === void 0 ? void 0 : query.query) === null || _b === void 0 ? void 0 : _b.uri)) {
            return (_c = query.uri) !== null && _c !== void 0 ? _c : query.query.uri;
        }
        if (query.query) {
            var flattenQuery = tslib_1.__assign(tslib_1.__assign({}, query), query.query);
            delete flattenQuery.query;
            return "" + basePath + qs_1.default.stringify(flattenQuery, { addQueryPrefix: true });
        }
        return "" + basePath + qs_1.default.stringify(query, { addQueryPrefix: true });
    };
    return UriHelper;
}());
exports.UriHelper = UriHelper;
//# sourceMappingURL=uri-helper.js.map