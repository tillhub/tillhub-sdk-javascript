import analytics from './analytics'
import { Transactions } from './transactions'

export interface AnalyticsHandlerTypes {
  analytics: {
    reports: {
      AnalyticsReportsRevenuesGrouped: any
      AnalyticsReportsTransactionsOverview: any
      AnalyticsReportsTransactionsDetail: any
      AnalyticsReportsTransactionsItems: any
      AnalyticsReportsBalancesOverview: any
      AnalyticsReportsBalancesDetail: any
      AnalyticsReportsCountingProtocols: any
      AnalyticsReportsDatev: any
      AnalyticsReportsProducts: any
    }
  }
}

export {
  analytics,
  Transactions
}
