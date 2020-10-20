export interface AnalyticsHandlerTypes {
    analytics: {
        reports: {
            AnalyticsReportsRevenuesGrouped: any;
            AnalyticsReportsTransactionsOverview: any;
            AnalyticsReportsTransactionsDetail: any;
            AnalyticsReportsTransactionsItems: any;
            AnalyticsReportsBalancesOverview: any;
            AnalyticsReportsBalancesDetail: any;
            AnalyticsReportsCountingProtocols: any;
            AnalyticsReportsDatev: any;
        };
    };
}
declare const _default: {
    analytics: {
        reports: {
            AnalyticsReportsTransactionsOverview: typeof import("./analytics/reports/transactions").AnalyticsReportsTransactionsOverview;
            AnalyticsReportsRevenuesGrouped: typeof import("./analytics/reports/revenues").AnalyticsReportsRevenuesGrouped;
            AnalyticsReportsTransactionsDetail: typeof import("./analytics/reports/transactions").AnalyticsReportsTransactionsDetail;
            AnalyticsReportsBalancesOverview: typeof import("./analytics/reports/balances").AnalyticsReportsBalancesOverview;
            AnalyticsReportsBalancesDetail: typeof import("./analytics/reports/balances").AnalyticsReportsBalancesDetail;
            AnalyticsReportsTransactionsItems: typeof import("./analytics/reports/transactions-items").AnalyticsReportsTransactionsItems;
            AnalyticsReportsCountingProtocols: typeof import("./analytics/reports/counting-protocols").AnalyticsReportsCountingProtocols;
            AnalyticsReportsDatev: typeof import("./analytics/reports/datev").AnalyticsReportsDatev;
        };
    };
};
export default _default;
