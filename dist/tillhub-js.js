"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tillhub = exports.TillhubClient = exports.defaultOptions = exports.v4 = exports.v3 = exports.v2 = exports.v1 = exports.v0 = void 0;
var tslib_1 = require("tslib");
var events_1 = tslib_1.__importDefault(require("events"));
var v0 = tslib_1.__importStar(require("./v0"));
exports.v0 = v0;
var v1 = tslib_1.__importStar(require("./v1"));
exports.v1 = v1;
var v2 = tslib_1.__importStar(require("./v2"));
exports.v2 = v2;
var v3 = tslib_1.__importStar(require("./v3"));
exports.v3 = v3;
var v4 = tslib_1.__importStar(require("./v4"));
exports.v4 = v4;
var client_1 = require("./client");
var errors = tslib_1.__importStar(require("./errors"));
var environment_1 = require("./environment");
exports.defaultOptions = {
    base: 'https://api.tillhub.com'
};
var TillhubClient = (function (_super) {
    tslib_1.__extends(TillhubClient, _super);
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
    TillhubClient.prototype.init = function (options) {
        if (options === void 0) { options = exports.defaultOptions; }
        if (this.handleOptions(options))
            return;
        var clientOptions = {
            headers: {}
        };
        if (options.base) {
            this.auth = new v1.Auth({ base: options.base });
        }
        if (options.responseInterceptors) {
            clientOptions.responseInterceptors = options.responseInterceptors;
        }
        if (options.requestInterceptors) {
            clientOptions.requestInterceptors = options.requestInterceptors;
        }
        this.http = client_1.Client.getInstance(clientOptions).setDefaults(clientOptions);
    };
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
        var _a;
        this.options = options;
        this.options.base = (_a = this.options.base) !== null && _a !== void 0 ? _a : 'https://api.tillhub.com';
        this.user = this.options.user;
        if (options.credentials) {
            var authOptions = {
                credentials: options.credentials,
                base: this.options.base,
                user: this.user
            };
            var clientOptions = {
                headers: {},
                responseInterceptors: options.responseInterceptors
            };
            if (options.credentials.token && clientOptions.headers) {
                clientOptions.headers.Authorization = "Bearer " + options.credentials.token;
            }
            if (options.whitelabel && clientOptions.headers) {
                clientOptions.headers['x-whitelabel'] = options.whitelabel;
            }
            this.auth = new v1.Auth(authOptions);
            this.http = client_1.Client.getInstance(clientOptions).setDefaults(clientOptions);
            return true;
        }
        return false;
    };
    TillhubClient.prototype.generateAuthenticatedInstance = function (Type, maybeOptions) {
        if (!this.options ||
            !this.options.base ||
            !this.http ||
            !this.auth ||
            !this.auth.authenticated) {
            throw new errors.UninstantiatedClient();
        }
        return new Type(tslib_1.__assign({ user: this.auth.user, base: this.options.base }, maybeOptions), this.http);
    };
    TillhubClient.prototype.taxes = function () {
        return this.generateAuthenticatedInstance(v0.Taxes);
    };
    TillhubClient.prototype.products = function () {
        return this.generateAuthenticatedInstance(v1.Products);
    };
    TillhubClient.prototype.productsV4 = function () {
        return this.generateAuthenticatedInstance(v4.Products);
    };
    TillhubClient.prototype.productGroups = function () {
        return this.generateAuthenticatedInstance(v0.ProductGroups);
    };
    TillhubClient.prototype.productTemplates = function () {
        return this.generateAuthenticatedInstance(v0.ProductTemplates);
    };
    TillhubClient.prototype.productAddonGroups = function () {
        return this.generateAuthenticatedInstance(v0.ProductAddonGroups);
    };
    TillhubClient.prototype.productAddons = function () {
        return this.generateAuthenticatedInstance(v0.ProductAddons);
    };
    TillhubClient.prototype.productBranchCustomizations = function () {
        return this.generateAuthenticatedInstance(v0.ProductBranchCustomizations);
    };
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
    TillhubClient.prototype.accounts = function () {
        return this.generateAuthenticatedInstance(v0.Accounts);
    };
    TillhubClient.prototype.expenseAccounts = function () {
        return this.generateAuthenticatedInstance(v0.ExpenseAccounts);
    };
    TillhubClient.prototype.paymentOptions = function () {
        return this.generateAuthenticatedInstance(v0.PaymentOptions);
    };
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
    TillhubClient.prototype.configurations = function () {
        return this.generateAuthenticatedInstance(v0.Configurations);
    };
    TillhubClient.prototype.inventoryConfiguration = function () {
        return this.generateAuthenticatedInstance(v0.InventoryConfiguration);
    };
    TillhubClient.prototype.users = function (configurationId) {
        return this.generateAuthenticatedInstance(v0.Users, { configurationId: configurationId });
    };
    TillhubClient.prototype.branches = function () {
        return this.generateAuthenticatedInstance(v0.Branches);
    };
    TillhubClient.prototype.branchesV1 = function () {
        return this.generateAuthenticatedInstance(v1.Branches);
    };
    TillhubClient.prototype.branchGroups = function () {
        return this.generateAuthenticatedInstance(v0.BranchGroups);
    };
    TillhubClient.prototype.devices = function () {
        return this.generateAuthenticatedInstance(v0.Devices);
    };
    TillhubClient.prototype.contents = function () {
        return this.generateAuthenticatedInstance(v0.Contents);
    };
    TillhubClient.prototype.contentTemplates = function () {
        return this.generateAuthenticatedInstance(v0.ContentTemplates);
    };
    TillhubClient.prototype.discounts = function () {
        return this.generateAuthenticatedInstance(v0.Discounts);
    };
    TillhubClient.prototype.customers = function () {
        return this.generateAuthenticatedInstance(v0.Customers);
    };
    TillhubClient.prototype.customersV1 = function () {
        return this.generateAuthenticatedInstance(v1.Customers);
    };
    TillhubClient.prototype.suppliers = function () {
        return this.generateAuthenticatedInstance(v0.Suppliers);
    };
    TillhubClient.prototype.suppliersProductsRelation = function () {
        return this.generateAuthenticatedInstance(v0.SuppliersProductsRelation);
    };
    TillhubClient.prototype.vouchers = function () {
        return this.generateAuthenticatedInstance(v1.Vouchers);
    };
    TillhubClient.prototype.voucherLogs = function () {
        return this.generateAuthenticatedInstance(v0.VoucherLogs);
    };
    TillhubClient.prototype.voucherSystems = function () {
        return this.generateAuthenticatedInstance(v0.VoucherSystems);
    };
    TillhubClient.prototype.abocardSystems = function () {
        return this.generateAuthenticatedInstance(v0.AbocardSystems);
    };
    TillhubClient.prototype.me = function () {
        return this.generateAuthenticatedInstance(v0.Me);
    };
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
    TillhubClient.prototype.stocksBookV1 = function () {
        return this.generateAuthenticatedInstance(v1.StocksBook);
    };
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
    TillhubClient.prototype.analytics = function (axiosOptions) {
        if (!this.options ||
            !this.options.base ||
            !this.http ||
            !this.auth ||
            !this.auth.authenticated) {
            throw new errors.UninstantiatedClient();
        }
        return new v0.Analytics({ user: this.auth.user, base: this.options.base, timeout: axiosOptions === null || axiosOptions === void 0 ? void 0 : axiosOptions.timeout }, this.http);
    };
    TillhubClient.prototype.analyticsHandlersV1 = function (axiosOptions) {
        if (!this.options ||
            !this.options.base ||
            !this.http ||
            !this.auth ||
            !this.auth.authenticated) {
            throw new errors.UninstantiatedClient();
        }
        return {
            analytics: {
                reports: {
                    AnalyticsReportsCustomers: new v1.analytics.reports.AnalyticsReportsCustomers({ user: this.auth.user, base: this.options.base, timeout: axiosOptions === null || axiosOptions === void 0 ? void 0 : axiosOptions.timeout }, this.http),
                    AnalyticsReportsPayments: new v1.analytics.reports.AnalyticsReportsPayments({ user: this.auth.user, base: this.options.base, timeout: axiosOptions === null || axiosOptions === void 0 ? void 0 : axiosOptions.timeout }, this.http),
                    AnalyticsReportsVouchers: new v1.analytics.reports.AnalyticsReportsVouchers({ user: this.auth.user, base: this.options.base, timeout: axiosOptions === null || axiosOptions === void 0 ? void 0 : axiosOptions.timeout }, this.http),
                    AnalyticsReportsDiscounts: new v1.analytics.reports.AnalyticsReportsDiscounts({ user: this.auth.user, base: this.options.base, timeout: axiosOptions === null || axiosOptions === void 0 ? void 0 : axiosOptions.timeout }, this.http),
                    AnalyticsReportsVat: new v1.analytics.reports.AnalyticsReportsVat({ user: this.auth.user, base: this.options.base, timeout: axiosOptions === null || axiosOptions === void 0 ? void 0 : axiosOptions.timeout }, this.http),
                    AnalyticsReportsProductGroups: new v1.analytics.reports.AnalyticsReportsProductGroups({ user: this.auth.user, base: this.options.base, timeout: axiosOptions === null || axiosOptions === void 0 ? void 0 : axiosOptions.timeout }, this.http),
                    AnalyticsReportsPaymentOptions: new v1.analytics.reports.AnalyticsReportsPaymentOptions({ user: this.auth.user, base: this.options.base, timeout: axiosOptions === null || axiosOptions === void 0 ? void 0 : axiosOptions.timeout }, this.http),
                    AnalyticsReportsStockTakings: new v1.analytics.reports.AnalyticsReportsStockTakings({ user: this.auth.user, base: this.options.base, timeout: axiosOptions === null || axiosOptions === void 0 ? void 0 : axiosOptions.timeout }, this.http),
                    AnalyticsReportsProcesses: new v1.analytics.reports.AnalyticsReportsProcesses({ user: this.auth.user, base: this.options.base, timeout: axiosOptions === null || axiosOptions === void 0 ? void 0 : axiosOptions.timeout }, this.http)
                }
            }
        };
    };
    TillhubClient.prototype.analyticsHandlers = function (axiosOptions) {
        if (!this.options ||
            !this.options.base ||
            !this.http ||
            !this.auth ||
            !this.auth.authenticated) {
            throw new errors.UninstantiatedClient();
        }
        return {
            analytics: {
                reports: {
                    AnalyticsReportsRevenuesGrouped: v2.analytics.reports.AnalyticsReportsRevenuesGrouped.create({ user: this.auth.user, base: this.options.base, timeout: axiosOptions === null || axiosOptions === void 0 ? void 0 : axiosOptions.timeout }, this.http),
                    AnalyticsReportsTransactionsOverview: v2.analytics.reports.AnalyticsReportsTransactionsOverview.create({ user: this.auth.user, base: this.options.base, timeout: axiosOptions === null || axiosOptions === void 0 ? void 0 : axiosOptions.timeout }, this.http),
                    AnalyticsReportsTransactionsDetail: v2.analytics.reports.AnalyticsReportsTransactionsDetail.create({ user: this.auth.user, base: this.options.base, timeout: axiosOptions === null || axiosOptions === void 0 ? void 0 : axiosOptions.timeout }, this.http),
                    AnalyticsReportsTransactionsItems: v2.analytics.reports.AnalyticsReportsTransactionsItems.create({ user: this.auth.user, base: this.options.base, timeout: axiosOptions === null || axiosOptions === void 0 ? void 0 : axiosOptions.timeout }, this.http),
                    AnalyticsReportsBalancesOverview: v2.analytics.reports.AnalyticsReportsBalancesOverview.create({ user: this.auth.user, base: this.options.base, timeout: axiosOptions === null || axiosOptions === void 0 ? void 0 : axiosOptions.timeout }, this.http),
                    AnalyticsReportsBalancesDetail: v2.analytics.reports.AnalyticsReportsBalancesDetail.create({ user: this.auth.user, base: this.options.base, timeout: axiosOptions === null || axiosOptions === void 0 ? void 0 : axiosOptions.timeout }, this.http),
                    AnalyticsReportsCountingProtocols: v2.analytics.reports.AnalyticsReportsCountingProtocols.create({ user: this.auth.user, base: this.options.base, timeout: axiosOptions === null || axiosOptions === void 0 ? void 0 : axiosOptions.timeout }, this.http),
                    AnalyticsReportsDatev: v2.analytics.reports.AnalyticsReportsDatev.create({ user: this.auth.user, base: this.options.base }, this.http),
                    AnalyticsReportsProducts: new v2.analytics.reports.AnalyticsReportsProducts({ user: this.auth.user, base: this.options.base, timeout: axiosOptions === null || axiosOptions === void 0 ? void 0 : axiosOptions.timeout }, this.http),
                    AnalyticsReportsStocks: v2.analytics.reports.AnalyticsReportsStocks.create({ user: this.auth.user, base: this.options.base, timeout: axiosOptions === null || axiosOptions === void 0 ? void 0 : axiosOptions.timeout }, this.http)
                }
            }
        };
    };
    TillhubClient.prototype.transactionsV3 = function () {
        return this.generateAuthenticatedInstance(v3.Transactions);
    };
    TillhubClient.prototype.analyticsHandlersV3 = function (axiosOptions) {
        if (!this.options ||
            !this.options.base ||
            !this.http ||
            !this.auth ||
            !this.auth.authenticated) {
            throw new errors.UninstantiatedClient();
        }
        return {
            analytics: {
                reports: {
                    AnalyticsReportsDatev: v3.analytics.reports.AnalyticsReportsDatev.create({ user: this.auth.user, base: this.options.base, timeout: axiosOptions === null || axiosOptions === void 0 ? void 0 : axiosOptions.timeout }, this.http),
                    AnalyticsReportsTransactions: v3.analytics.reports.AnalyticsReportsTransactions.create({ user: this.auth.user, base: this.options.base, timeout: axiosOptions === null || axiosOptions === void 0 ? void 0 : axiosOptions.timeout }, this.http),
                    AnalyticsReportsBalances: v3.analytics.reports.AnalyticsReportsBalances.create({ user: this.auth.user, base: this.options.base, timeout: axiosOptions === null || axiosOptions === void 0 ? void 0 : axiosOptions.timeout }, this.http),
                    AnalyticsReportsCountingProtocols: v3.analytics.reports.AnalyticsReportsCountingProtocols.create({ user: this.auth.user, base: this.options.base, timeout: axiosOptions === null || axiosOptions === void 0 ? void 0 : axiosOptions.timeout }, this.http),
                    AnalyticsReportsRevenues: v3.analytics.reports.AnalyticsReportsRevenues.create({ user: this.auth.user, base: this.options.base, timeout: axiosOptions === null || axiosOptions === void 0 ? void 0 : axiosOptions.timeout }, this.http)
                }
            }
        };
    };
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
    TillhubClient.prototype.transactions = function (axiosOptions) {
        if (!this.options ||
            !this.options.base ||
            !this.http ||
            !this.auth ||
            !this.auth.authenticated) {
            throw new errors.UninstantiatedClient();
        }
        return new v1.Transactions({ user: this.auth.user, base: this.options.base, timeout: axiosOptions === null || axiosOptions === void 0 ? void 0 : axiosOptions.timeout }, this.http);
    };
    TillhubClient.prototype.transactionsV2 = function () {
        return this.generateAuthenticatedInstance(v2.Transactions);
    };
    TillhubClient.prototype.ordersV2 = function () {
        return this.generateAuthenticatedInstance(v2.Orders);
    };
    TillhubClient.prototype.exportsV1 = function () {
        return this.generateAuthenticatedInstance(v1.ExportsV1);
    };
    TillhubClient.prototype.staff = function () {
        return this.generateAuthenticatedInstance(v0.Staff);
    };
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
    TillhubClient.prototype.auditLogs = function () {
        if (!this.options ||
            !this.options.base ||
            !this.http ||
            !this.auth ||
            !this.auth.authenticated) {
            throw new errors.UninstantiatedClient();
        }
        return new v0.AuditLogs({ user: this.auth.user, base: this.options.base }, this.http);
    };
    TillhubClient.prototype.auditLogsV1 = function () {
        if (!this.options ||
            !this.options.base ||
            !this.http ||
            !this.auth ||
            !this.auth.authenticated) {
            throw new errors.UninstantiatedClient();
        }
        return new v1.AuditLogs({ user: this.auth.user, base: this.options.base }, this.http);
    };
    TillhubClient.prototype.registers = function () {
        return this.generateAuthenticatedInstance(v1.Registers);
    };
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
    TillhubClient.prototype.videos = function () {
        return this.generateAuthenticatedInstance(v0.Videos);
    };
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
    TillhubClient.prototype.messages = function () {
        if (!this.options ||
            !this.options.base ||
            !this.http ||
            !this.auth ||
            !this.auth.authenticated) {
            throw new errors.UninstantiatedClient();
        }
        return new v0.Messages({ user: this.auth.user, base: this.options.base }, this.http);
    };
    TillhubClient.prototype.print = function () {
        return this.generateAuthenticatedInstance(v0.Print);
    };
    TillhubClient.prototype.favourites = function () {
        return this.generateAuthenticatedInstance(v0.Favourites);
    };
    TillhubClient.prototype.balances = function () {
        return this.generateAuthenticatedInstance(v1.Balances);
    };
    TillhubClient.prototype.settings_old = function () {
        return this.generateAuthenticatedInstance(v0.LegacySettings);
    };
    TillhubClient.prototype.tags = function () {
        return this.generateAuthenticatedInstance(v0.Tags);
    };
    TillhubClient.prototype.tagsV1 = function () {
        return this.generateAuthenticatedInstance(v1.Tags);
    };
    TillhubClient.prototype.safes = function () {
        return this.generateAuthenticatedInstance(v0.Safes);
    };
    TillhubClient.prototype.safesLogBook = function () {
        return this.generateAuthenticatedInstance(v0.SafesLogBook);
    };
    TillhubClient.prototype.safesLogBookV1 = function () {
        return this.generateAuthenticatedInstance(v1.SafesLogBook);
    };
    TillhubClient.prototype.warehouses = function () {
        return this.generateAuthenticatedInstance(v0.Warehouses);
    };
    TillhubClient.prototype.webhooks = function () {
        return this.generateAuthenticatedInstance(v0.Webhooks);
    };
    TillhubClient.prototype.webhookEvents = function () {
        return this.generateAuthenticatedInstance(v0.WebhookEvents);
    };
    TillhubClient.prototype.supportedEvents = function () {
        return this.generateAuthenticatedInstance(v0.SupportedEvents);
    };
    TillhubClient.prototype.staffGroups = function () {
        return this.generateAuthenticatedInstance(v0.StaffGroups);
    };
    TillhubClient.prototype.serviceCategory = function () {
        return this.generateAuthenticatedInstance(v0.ServiceCategory);
    };
    TillhubClient.prototype.services = function () {
        return this.generateAuthenticatedInstance(v0.Services);
    };
    TillhubClient.prototype.exports = function () {
        return this.generateAuthenticatedInstance(v0.Exports);
    };
    TillhubClient.prototype.promotions = function () {
        return this.generateAuthenticatedInstance(v0.Promotions);
    };
    TillhubClient.prototype.productServiceQuestionGroups = function () {
        return this.generateAuthenticatedInstance(v0.ProductServiceQuestionGroups);
    };
    TillhubClient.prototype.productServiceQuestions = function () {
        return this.generateAuthenticatedInstance(v0.ProductServiceQuestions);
    };
    TillhubClient.prototype.data = function () {
        return this.generateAuthenticatedInstance(v0.Data);
    };
    TillhubClient.prototype.reasons = function () {
        return this.generateAuthenticatedInstance(v0.Reasons);
    };
    TillhubClient.prototype.processes = function () {
        return this.generateAuthenticatedInstance(v0.Processes);
    };
    TillhubClient.prototype.functions = function () {
        return this.generateAuthenticatedInstance(v0.Functions);
    };
    TillhubClient.prototype.deviceGroups = function () {
        return this.generateAuthenticatedInstance(v0.DeviceGroups);
    };
    TillhubClient.prototype.carts = function () {
        return this.generateAuthenticatedInstance(v1.Carts);
    };
    TillhubClient.prototype.staffPermissionsTemplates = function () {
        return this.generateAuthenticatedInstance(v0.StaffPermissionsTemplates);
    };
    TillhubClient.prototype.correspondences = function () {
        return this.generateAuthenticatedInstance(v0.Correspondences);
    };
    TillhubClient.prototype.storefronts = function () {
        return this.generateAuthenticatedInstance(v0.Storefronts);
    };
    TillhubClient.prototype.categoryTrees = function () {
        return this.generateAuthenticatedInstance(v0.CategoryTrees);
    };
    TillhubClient.prototype.categories = function () {
        return this.generateAuthenticatedInstance(v0.Categories);
    };
    TillhubClient.prototype.dependencies = function () {
        return this.generateAuthenticatedInstance(v0.Dependencies);
    };
    TillhubClient.prototype.trash = function () {
        return this.generateAuthenticatedInstance(v0.Trash);
    };
    TillhubClient.prototype.timetracking = function () {
        return this.generateAuthenticatedInstance(v0.Timetracking);
    };
    TillhubClient.prototype.countingProtocols = function () {
        return this.generateAuthenticatedInstance(v0.CountingProtocols);
    };
    TillhubClient.prototype.stockTakings = function () {
        return this.generateAuthenticatedInstance(v0.StockTakings);
    };
    TillhubClient.prototype.userPermissionsTemplates = function () {
        return this.generateAuthenticatedInstance(v0.UserPermissionsTemplates);
    };
    TillhubClient.prototype.dbBackups = function () {
        return this.generateAuthenticatedInstance(v0.DbBackups);
    };
    TillhubClient.prototype.purchaseOrders = function () {
        return this.generateAuthenticatedInstance(v0.PurchaseOrders);
    };
    TillhubClient.prototype.consignmentNotes = function () {
        return this.generateAuthenticatedInstance(v0.ConsignmentNotes);
    };
    TillhubClient.environment = environment_1.environment;
    return TillhubClient;
}(events_1.default.EventEmitter));
exports.TillhubClient = TillhubClient;
var Tillhub = (function (_super) {
    tslib_1.__extends(Tillhub, _super);
    function Tillhub(options) {
        var _this = _super.call(this, options) || this;
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