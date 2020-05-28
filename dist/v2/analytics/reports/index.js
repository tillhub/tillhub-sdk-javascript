"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var transactions_1 = require("./transactions");
var transactions_items_1 = require("./transactions-items");
var balances_1 = require("./balances");
var counting_protocols_1 = require("./counting-protocols");
var datev_1 = require("./datev");
exports.default = {
    AnalyticsReportsTransactionsOverview: transactions_1.AnalyticsReportsTransactionsOverview,
    AnalyticsReportsTransactionsDetail: transactions_1.AnalyticsReportsTransactionsDetail,
    AnalyticsReportsBalancesOverview: balances_1.AnalyticsReportsBalancesOverview,
    AnalyticsReportsBalancesDetail: balances_1.AnalyticsReportsBalancesDetail,
    AnalyticsReportsTransactionsItems: transactions_items_1.AnalyticsReportsTransactionsItems,
    AnalyticsReportsCountingProtocols: counting_protocols_1.AnalyticsReportsCountingProtocols,
    AnalyticsReportsDatev: datev_1.AnalyticsReportsDatev
};
//# sourceMappingURL=index.js.map