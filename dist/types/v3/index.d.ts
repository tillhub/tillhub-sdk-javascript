import analytics from './analytics';
import { Transactions } from './transactions';
export interface AnalyticsHandlerTypesV3 {
    analytics: {
        reports: {
            AnalyticsReportsDatev: any;
            AnalyticsReportsTransactions: any;
            AnalyticsReportsBalances: any;
            AnalyticsReportsCountingProtocols: any;
            AnalyticsReportsRevenues: any;
        };
    };
}
export { analytics, Transactions };
