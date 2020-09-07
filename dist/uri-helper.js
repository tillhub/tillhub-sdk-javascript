"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UriHelper = void 0;
var tslib_1 = require("tslib");
var qs_1 = tslib_1.__importDefault(require("qs"));
var UriHelper = (function () {
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
            var flattenQuery = tslib_1.__assign(tslib_1.__assign({}, query), query.query);
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