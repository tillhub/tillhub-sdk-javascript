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
    TillhubClient.prototype.generateAuthenticatedInstance = function (type, maybeOptions) {
        if (!this.options ||
            !this.options.base ||
            !this.http ||
            !this.auth ||
            !this.auth.authenticated) {
            throw new errors.UninstantiatedClient();
        }
        return new type(__assign({ user: this.auth.user, base: this.options.base }, maybeOptions), this.http);
    };
    /**
     * Create an authenticated taxes instance
     *
     */
    TillhubClient.prototype.taxes = function () {
        return this.generateAuthenticatedInstance(v0.Taxes);
    };
    /**
     * Create an authenticated products instance
     *
     */
    TillhubClient.prototype.products = function () {
        return this.generateAuthenticatedInstance(v1.Products);
    };
    /**
     * Create an authenticated product groups instance
     *
     */
    TillhubClient.prototype.productGroups = function () {
        return this.generateAuthenticatedInstance(v0.ProductGroups);
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
        return this.generateAuthenticatedInstance(v0.Accounts);
    };
    /**
     * Create an authenticated expense accounts instance
     *
     */
    TillhubClient.prototype.expenseAccounts = function () {
        return this.generateAuthenticatedInstance(v0.ExpenseAccounts);
    };
    /**
     * Create an authenticated expense accounts instance
     *
     */
    TillhubClient.prototype.paymentOptions = function () {
        return this.generateAuthenticatedInstance(v0.PaymentOptions);
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
        return this.generateAuthenticatedInstance(v0.Configurations);
    };
    /**
     * Create an authenticated configurations instance
     *
     */
    TillhubClient.prototype.users = function (configurationId) {
        return this.generateAuthenticatedInstance(v0.Users, { configurationId: configurationId });
    };
    /**
     * Create an authenticated branches instance
     *
     */
    TillhubClient.prototype.branches = function () {
        return this.generateAuthenticatedInstance(v0.Branches);
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
        return this.generateAuthenticatedInstance(v0.Vouchers);
    };
    /**
     * Create an authenticated vouchers logs instance
     *
     */
    TillhubClient.prototype.voucherLogs = function () {
        return this.generateAuthenticatedInstance(v0.VoucherLogs);
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
     * Create an authenticated StocksBook instance
     *
     */
    TillhubClient.prototype.stocksBook = function () {
        if (!this.options ||
            !this.options.base ||
            !this.http ||
            !this.auth ||
            !this.auth.authenticated) {
            throw new errors.UninstantiatedClient();
        }
        return new v0.StocksBook({ user: this.auth.user, base: this.options.base }, this.http);
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
     * Create an authenticated TransactionsLegacy instance
     *
     */
    TillhubClient.prototype.transactionsLegacy = function () {
        if (!this.options ||
            !this.options.base ||
            !this.http ||
            !this.auth ||
            !this.auth.authenticated) {
            throw new errors.UninstantiatedClient();
        }
        return new v1.TransactionsLegacy({ user: this.auth.user, base: this.options.base }, this.http);
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
    /**
     * Create an authenticated Images instance
     *
     */
    TillhubClient.prototype.images = function () {
        if (!this.options ||
            !this.options.base ||
            !this.http ||
            !this.auth ||
            !this.auth.authenticated) {
            throw new errors.UninstantiatedClient();
        }
        return new v0.Images({ user: this.auth.user, base: this.options.base }, this.http);
    };
    /**
     * Create an authenticated Notifications instance
     *
     */
    TillhubClient.prototype.notifications = function () {
        if (!this.options ||
            !this.options.base ||
            !this.http ||
            !this.auth ||
            !this.auth.authenticated) {
            throw new errors.UninstantiatedClient();
        }
        return new v0.Notifications({ user: this.auth.user, base: this.options.base }, this.http);
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