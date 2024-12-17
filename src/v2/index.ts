import analytics from './analytics'
import { Transactions } from './transactions'
import { Orders } from './orders'
import { Products } from './products'

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
      AnalyticsReportsStocks: any
    }
  }
}

export {
  analytics,
  Transactions,
  Orders,
  Products
}
