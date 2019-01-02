"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import 'core-js/fn/array.find'
// import * as EventEmitter from 'events'
var events_1 = __importDefault(require("events"));
var v0 = __importStar(require("./v0"));
exports.v0 = v0;
var v1 = __importStar(require("./v1"));
exports.v1 = v1;
var client_1 = require("./client");
var errors = __importStar(require("./errors"));
var environment_1 = require("./environment");
exports.defaultOptions = {
    base: 'https://api.tillhub.com'
};
var TillhubClient = /** @class */ (function (_super) {
    __extends(TillhubClient, _super);
    function TillhubClient(options) {
        var _this = _super.call(this) || this;
        _this.initialized = false;
        _this.auth = new v1.Auth({ base: exports.defaultOptions.base });
        if (!options)
            return _this;
        if (_this.handleOptions(options)) {
            _this.initialized = true;
        }
        return _this;
    }
    /**
     * Initialise the SDK instance by authenticating the client
     *
     */
    TillhubClient.prototype.init = function (options) {
        if (options === void 0) { options = exports.defaultOptions; }
        // in cases where credentials and / or tokens and / or users are already
        // we will short circuit the client initialisations
        if (this.handleOptions(options))
            return;
        // in all other cases we will instantiate clients, that need to be authenticated
        // by the caller before any API will be available
        var clientOptions = {
            headers: {}
        };
        if (options.base) {
            this.auth = new v1.Auth({ base: options.base });
        }
        this.http = client_1.Client.getInstance(clientOptions).setDefaults(clientOptions);
    };
    /**
     * De-Initialise the SDK instance and all its state
     *
     */
    TillhubClient.prototype.destroy = function () {
        client_1.Client.clearInstance();
        if (this.auth) {
            this.auth.clearInstance();
        }
        this.http = undefined;
        this.options = undefined;
        this.user = undefined;
    };
    TillhubClient.prototype.handleOptions = function (options) {
        this.options = options;
        this.options.base = this.options.base || 'https://api.tillhub.com';
        this.user = this.options.user;
        if (options.credentials) {
            var authOptions = {
                credentials: options.credentials,
                base: this.options.base,
                user: this.user
            };
            var clientOptions = {
                headers: {}
            };
            this.auth = new v1.Auth(authOptions);
            this.http = client_1.Client.getInstance(clientOptions).setDefaults(clientOptions);
            return true;
        }
        return false;
    };
    /**
     * Create an authenticated taxes instance
     *
     */
    TillhubClient.prototype.taxes = function () {
        if (!this.options ||
            !this.options.base ||
            !this.http ||
            !this.auth ||
            !this.auth.authenticated) {
            throw new errors.UninstantiatedClient();
        }
        return new v0.Taxes({ user: this.auth.user, base: this.options.base }, this.http);
    };
    /**
     * Create an authenticated products instance
     *
     */
    TillhubClient.prototype.products = function () {
        if (!this.options || !this.options.base || !this.http || !this.auth) {
            throw new errors.UninstantiatedClient();
        }
        return new v1.Products({ user: this.auth.user, base: this.options.base }, this.http);
    };
    /**
     * Create an authenticated product groups instance
     *
     */
    TillhubClient.prototype.productGroups = function () {
        if (!this.options ||
            !this.options.base ||
            !this.http ||
            !this.auth ||
            !this.auth.authenticated) {
            throw new errors.UninstantiatedClient();
        }
        return new v0.ProductGroups({ user: this.auth.user, base: this.options.base }, this.http);
    };
    /**
     * Create an authenticated deliveries instance
     *
     */
    TillhubClient.prototype.deliveries = function () {
        if (!this.options ||
            !this.options.base ||
            !this.http ||
            !this.auth ||
            !this.auth.authenticated) {
            throw new errors.UninstantiatedClient();
        }
        return new v0.Deliveries({ user: this.auth.user, base: this.options.base }, this.http);
    };
    /**
     * Create an authenticated accounts instance
     *
     */
    TillhubClient.prototype.accounts = function () {
        if (!this.options ||
            !this.options.base ||
            !this.http ||
            !this.auth ||
            !this.auth.authenticated) {
            throw new errors.UninstantiatedClient();
        }
        return new v0.Accounts({ user: this.auth.user, base: this.options.base }, this.http);
    };
    /**
     * Create an authenticated templates instance
     *
     */
    TillhubClient.prototype.templates = function () {
        if (!this.options ||
            !this.options.base ||
            !this.http ||
            !this.auth ||
            !this.auth.authenticated) {
            throw new errors.UninstantiatedClient();
        }
        return new v1.Templates({ user: this.auth.user, base: this.options.base }, this.http);
    };
    /**
     * Create an authenticated configurations instance
     *
     */
    TillhubClient.prototype.configurations = function () {
        if (!this.options ||
            !this.options.base ||
            !this.http ||
            !this.auth ||
            !this.auth.authenticated) {
            throw new errors.UninstantiatedClient();
        }
        return new v0.Configurations({ user: this.auth.user, base: this.options.base }, this.http);
    };
    /**
     * Create an authenticated branches instance
     *
     */
    TillhubClient.prototype.branches = function () {
        if (!this.options ||
            !this.options.base ||
            !this.http ||
            !this.auth ||
            !this.auth.authenticated) {
            throw new errors.UninstantiatedClient();
        }
        return new v0.Branches({ user: this.auth.user, base: this.options.base }, this.http);
    };
    /**
     * Create an authenticated customers instance
     *
     */
    TillhubClient.prototype.customers = function () {
        if (!this.options ||
            !this.options.base ||
            !this.http ||
            !this.auth ||
            !this.auth.authenticated) {
            throw new errors.UninstantiatedClient();
        }
        return new v0.Customers({ user: this.auth.user, base: this.options.base }, this.http);
    };
    /**
     * Create an authenticated vouchers instance
     *
     */
    TillhubClient.prototype.vouchers = function () {
        if (!this.options ||
            !this.options.base ||
            !this.http ||
            !this.auth ||
            !this.auth.authenticated) {
            throw new errors.UninstantiatedClient();
        }
        return new v0.Vouchers({ user: this.auth.user, base: this.options.base }, this.http);
    };
    /**
     * Create an authenticated vouchers logs instance
     *
     */
    TillhubClient.prototype.voucherLogs = function () {
        if (!this.options ||
            !this.options.base ||
            !this.http ||
            !this.auth ||
            !this.auth.authenticated) {
            throw new errors.UninstantiatedClient();
        }
        return new v0.VoucherLogs({ user: this.auth.user, base: this.options.base }, this.http);
    };
    /**
     * Create an authenticated invoices instance
     *
     */
    TillhubClient.prototype.invoices = function () {
        if (!this.options ||
            !this.options.base ||
            !this.http ||
            !this.auth ||
            !this.auth.authenticated) {
            throw new errors.UninstantiatedClient();
        }
        return new v0.Invoices({ user: this.auth.user, base: this.options.base }, this.http);
    };
    /**
     * Create an authenticated Stocks instance
     *
     */
    TillhubClient.prototype.stocks = function () {
        if (!this.options ||
            !this.options.base ||
            !this.http ||
            !this.auth ||
            !this.auth.authenticated) {
            throw new errors.UninstantiatedClient();
        }
        return new v0.Stocks({ user: this.auth.user, base: this.options.base }, this.http);
    };
    /**
     * Create an authenticated Orders instance
     *
     */
    TillhubClient.prototype.orders = function () {
        if (!this.options ||
            !this.options.base ||
            !this.http ||
            !this.auth ||
            !this.auth.authenticated) {
            throw new errors.UninstantiatedClient();
        }
        return new v0.Orders({ user: this.auth.user, base: this.options.base }, this.http);
    };
    /**
     * Create an authenticated Analytics instance
     *
     */
    TillhubClient.prototype.analytics = function () {
        if (!this.options ||
            !this.options.base ||
            !this.http ||
            !this.auth ||
            !this.auth.authenticated) {
            throw new errors.UninstantiatedClient();
        }
        return new v0.Analytics({ user: this.auth.user, base: this.options.base }, this.http);
    };
    /**
     * Create an authenticated Transactions instance
     *
     */
    TillhubClient.prototype.transactions = function () {
        if (!this.options ||
            !this.options.base ||
            !this.http ||
            !this.auth ||
            !this.auth.authenticated) {
            throw new errors.UninstantiatedClient();
        }
        return new v1.Transactions({ user: this.auth.user, base: this.options.base }, this.http);
    };
    /**
     * Create an authenticated Staff instance
     *
     */
    TillhubClient.prototype.staff = function () {
        if (!this.options ||
            !this.options.base ||
            !this.http ||
            !this.auth ||
            !this.auth.authenticated) {
            throw new errors.UninstantiatedClient();
        }
        return new v0.Staff({ user: this.auth.user, base: this.options.base }, this.http);
    };
    /**
     * Create an authenticated Staff instance
     *
     */
    TillhubClient.prototype.auditActions = function () {
        if (!this.options ||
            !this.options.base ||
            !this.http ||
            !this.auth ||
            !this.auth.authenticated) {
            throw new errors.UninstantiatedClient();
        }
        return new v0.AuditActions({ user: this.auth.user, base: this.options.base }, this.http);
    };
    /**
     * Create an authenticated Registers instance
     *
     */
    TillhubClient.prototype.registers = function () {
        if (!this.options ||
            !this.options.base ||
            !this.http ||
            !this.auth ||
            !this.auth.authenticated) {
            throw new errors.UninstantiatedClient();
        }
        return new v1.Registers({ user: this.auth.user, base: this.options.base }, this.http);
    };
    TillhubClient.environment = environment_1.environment;
    return TillhubClient;
}(events_1.default.EventEmitter));
exports.TillhubClient = TillhubClient;
var Tillhub = /** @class */ (function (_super) {
    __extends(Tillhub, _super);
    function Tillhub(options) {
        var _this = _super.call(this, options) || this;
        // only emit errors, when we have listeners to prevent unhandled rejects etc.
        _this.on('raw-error', function (err) {
            if (_this.listeners('error').length > 0)
                _this.emit('error', err);
        });
        return _this;
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