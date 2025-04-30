import analytics from './analytics'
import { Transactions } from './transactions'
import { PaymentMethods } from './payment-methods'
export interface AnalyticsHandlerTypesV3 {
  analytics: {
    reports: {
      AnalyticsReportsDatev: any
      AnalyticsReportsTransactions: any
      AnalyticsReportsBalances: any
      AnalyticsReportsCountingProtocols: any
      AnalyticsReportsRevenues: any
    }
  }
}

export {
  analytics,
  Transactions,
  PaymentMethods
}
