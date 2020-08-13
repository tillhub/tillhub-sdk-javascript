"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UriHelper = void 0;
var qs_1 = __importDefault(require("qs"));
var UriHelper = /** @class */ (function () {
    function UriHelper(endpoint, options) {
        var base = options.base || 'https://api.tillhub.com';
        var user = options.user ? "/" + options.user : '';
        this.baseUri = "" + base + endpoint + user;
    }
    UriHelper.prototype.generateBaseUri = function (path) {
        var additionalPath = path || '';
        return "" + this.baseUri + additionalPath;
    };
    UriHelper.prototype.generateUriWithQuery = function (basePath, query) {
        var uri;
        if (!query) {
            uri = "" + basePath;
        }
        else if (query.uri || (query.query && query.query.uri)) {
            uri = query.uri || query.query.uri;
        }
        else if (query.query) {
            var flattenQuery = __assign(__assign({}, query), query.query);
            delete flattenQuery.query;
            uri = basePath + "?" + qs_1.default.stringify(flattenQuery);
        }
        else {
            uri = basePath + "?" + qs_1.default.stringify(query);
        }
        return uri;
    };
    return UriHelper;
}());
exports.UriHelper = UriHelper;
//# sourceMappingURL=uri-helper.js.map