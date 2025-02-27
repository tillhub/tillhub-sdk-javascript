"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var customers_1 = require("./customers");
var payments_1 = require("./payments");
var vouchers_1 = require("./vouchers");
var discounts_1 = require("./discounts");
var vat_1 = require("./vat");
var product_groups_1 = require("./product_groups");
var payment_options_1 = require("./payment_options");
var stock_takings_1 = require("./stock_takings");
var processes_1 = require("./processes");
var inventory_1 = require("./inventory");
exports.default = {
    AnalyticsReportsCustomers: customers_1.AnalyticsReportsCustomers,
    AnalyticsReportsPayments: payments_1.AnalyticsReportsPayments,
    AnalyticsReportsVouchers: vouchers_1.AnalyticsReportsVouchers,
    AnalyticsReportsDiscounts: discounts_1.AnalyticsReportsDiscounts,
    AnalyticsReportsVat: vat_1.AnalyticsReportsVat,
    AnalyticsReportsProductGroups: product_groups_1.AnalyticsReportsProductGroups,
    AnalyticsReportsPaymentOptions: payment_options_1.AnalyticsReportsPaymentOptions,
    AnalyticsReportsStockTakings: stock_takings_1.AnalyticsReportsStockTakings,
    AnalyticsReportsProcesses: processes_1.AnalyticsReportsProcesses,
    AnalyticsReportsInventory: inventory_1.AnalyticsReportsInventory
};
//# sourceMappingURL=index.js.map