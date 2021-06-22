"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var transactions_1 = require("./transactions");
var revenues_1 = require("./revenues");
var transactions_items_1 = require("./transactions-items");
var balances_1 = require("./balances");
var counting_protocols_1 = require("./counting-protocols");
var datev_1 = require("./datev");
var products_1 = require("./products");
var stocks_1 = require("./stocks");
exports.default = {
    AnalyticsReportsTransactionsOverview: transactions_1.AnalyticsReportsTransactionsOverview,
    AnalyticsReportsRevenuesGrouped: revenues_1.AnalyticsReportsRevenuesGrouped,
    AnalyticsReportsTransactionsDetail: transactions_1.AnalyticsReportsTransactionsDetail,
    AnalyticsReportsBalancesOverview: balances_1.AnalyticsReportsBalancesOverview,
    AnalyticsReportsBalancesDetail: balances_1.AnalyticsReportsBalancesDetail,
    AnalyticsReportsTransactionsItems: transactions_items_1.AnalyticsReportsTransactionsItems,
    AnalyticsReportsCountingProtocols: counting_protocols_1.AnalyticsReportsCountingProtocols,
    AnalyticsReportsDatev: datev_1.AnalyticsReportsDatev,
    AnalyticsReportsProducts: products_1.AnalyticsReportsProducts,
    AnalyticsReportsStocks: stocks_1.AnalyticsReportsStocks
};
//# sourceMappingURL=index.js.map