"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import 'core-js/fn/array.find'
var EventEmitter = require("events");
var Auth_1 = require("./v0/Auth");
var Transactions_1 = require("./v0/Transactions");
var Client_1 = require("./Client");
var errors = require("./Errors");
var v0_1 = require("./v0");
exports.v0 = v0_1.default;
var v1_1 = require("./v1");
exports.v1 = v1_1.default;
exports.defaultOptions = {
    base: 'https://api.tillhub.com'
};
var TillhubClient = /** @class */ (function (_super) {
    __extends(TillhubClient, _super);
    function TillhubClient(options) {
        var _this = _super.call(this) || this;
        if (!options)
            return _this;
        _this.handleOptions(options);
        return _this;
    }
    /**
     * Initialise the SDK instance by authenticating the client
     *
     */
    TillhubClient.prototype.init = function (options) {
        if (options === void 0) { options = exports.defaultOptions; }
        this.handleOptions(options);
        var clientOptions = {
            headers: {}
        };
        this.auth = new v1_1.default.Auth({ base: options ? options.base : exports.defaultOptions.base });
        this.http = Client_1.Client.getInstance(clientOptions).setDefaults(clientOptions);
    };
    TillhubClient.prototype.handleOptions = function (options) {
        this.options = options;
        this.options.base = this.options.base || 'https://api.tillhub.com';
        if (options.credentials) {
            var authOptions = {
                type: Auth_1.AuthTypes.username,
                credentials: options.credentials,
                base: this.options.base
            };
            this.auth = new v1_1.default.Auth(authOptions);
        }
    };
    /**
     * Create an authenticated transactions instance
     *
     */
    TillhubClient.prototype.transactions = function () {
        if (!this.options || !this.options.base || !this.http || !this.auth) {
            throw new errors.UninstantiatedClient();
        }
        return new Transactions_1.Transactions({ user: this.auth.user, base: this.options.base }, this.http);
    };
    return TillhubClient;
}(EventEmitter));
exports.TillhubClient = TillhubClient;
var Tillhub = /** @class */ (function (_super) {
    __extends(Tillhub, _super);
    function Tillhub(options) {
        return _super.call(this, options) || this;
    }
    Tillhub.getInstance = function (options) {
        if (!Tillhub.instance) {
            Tillhub.instance = new Tillhub(options);
        }
        return Tillhub.instance;
    };
    return Tillhub;
}(TillhubClient));
exports.Tillhub = Tillhub;
exports.default = Tillhub.getInstance({ base: exports.defaultOptions.base });
//# sourceMappingURL=tillhub-js.js.map