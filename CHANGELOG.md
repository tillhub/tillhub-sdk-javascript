# [2.3.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v2.2.2...v2.3.0) (2019-01-21)


### Features

* **staff:** remove unused query params and count method; pluralise ([64af27e](https://github.com/tillhub/tillhub-sdk-javascript/commit/64af27e))
* **tests:** abstract sdk test init to utils ([c2b6a0b](https://github.com/tillhub/tillhub-sdk-javascript/commit/c2b6a0b))

## [2.2.2](https://github.com/tillhub/tillhub-sdk-javascript/compare/v2.2.1...v2.2.2) (2019-01-21)


### Bug Fixes

* **staff:** fix staff getAll query params types and checks; add tests; refctor test process ([d10639a](https://github.com/tillhub/tillhub-sdk-javascript/commit/d10639a))

## [2.2.1](https://github.com/tillhub/tillhub-sdk-javascript/compare/v2.2.0...v2.2.1) (2019-01-18)


### Bug Fixes

* **staff:** rename method ([42c0b11](https://github.com/tillhub/tillhub-sdk-javascript/commit/42c0b11))

# [2.2.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v2.1.0...v2.2.0) (2019-01-18)


### Features

* **staff:** count all staff handler ([2cb8b26](https://github.com/tillhub/tillhub-sdk-javascript/commit/2cb8b26))

# [2.1.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v2.0.0...v2.1.0) (2019-01-18)


### Features

* **analytics:** export vat report ([a3a5d9a](https://github.com/tillhub/tillhub-sdk-javascript/commit/a3a5d9a))

# [2.0.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.102.1...v2.0.0) (2019-01-17)


### Features

* **transactions v1:** Change v1.Transactions to v1.TransactionsLegacy. Create new v1.Transactions. ([a227eeb](https://github.com/tillhub/tillhub-sdk-javascript/commit/a227eeb))


### BREAKING CHANGES

* **transactions v1:** v1.Transactions is no longer using the api endpoint v1/transactions/legacy but
instead v1/transactions

## [1.102.1](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.102.0...v1.102.1) (2019-01-17)


### Bug Fixes

* **analytics:** vat report route fix ([bbaf3d3](https://github.com/tillhub/tillhub-sdk-javascript/commit/bbaf3d3))

# [1.102.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.101.1...v1.102.0) (2019-01-17)


### Features

* **reports:** add get vat report handler ([0533d21](https://github.com/tillhub/tillhub-sdk-javascript/commit/0533d21))

## [1.101.1](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.101.0...v1.101.1) (2019-01-16)


### Bug Fixes

* **expense_accounts:** fixes route ref ([a987b28](https://github.com/tillhub/tillhub-sdk-javascript/commit/a987b28))

# [1.101.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.100.0...v1.101.0) (2019-01-16)


### Features

* **analytics:** adds simple cartitem tx ([da3234f](https://github.com/tillhub/tillhub-sdk-javascript/commit/da3234f))

# [1.100.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.99.0...v1.100.0) (2019-01-16)


### Features

* **analytics:** payments report handler ([bb3d108](https://github.com/tillhub/tillhub-sdk-javascript/commit/bb3d108))

# [1.99.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.98.1...v1.99.0) (2019-01-16)


### Features

* **realtime:** prepare realtime for bundle testing ([de7be91](https://github.com/tillhub/tillhub-sdk-javascript/commit/de7be91))

## [1.98.1](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.98.0...v1.98.1) (2019-01-15)


### Bug Fixes

* **auth:** fixes key in service account auth ([d8b487c](https://github.com/tillhub/tillhub-sdk-javascript/commit/d8b487c))

# [1.98.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.97.0...v1.98.0) (2019-01-15)


### Features

* **configurations:** adds custom dashboards ([23b44d7](https://github.com/tillhub/tillhub-sdk-javascript/commit/23b44d7))

# [1.97.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.96.0...v1.97.0) (2019-01-15)


### Features

* updated analytics voucher option interface ([91351c9](https://github.com/tillhub/tillhub-sdk-javascript/commit/91351c9))

# [1.96.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.95.0...v1.96.0) (2019-01-14)


### Features

* analytics: VoucherOptions added additional filter parameters ([abcd114](https://github.com/tillhub/tillhub-sdk-javascript/commit/abcd114))

# [1.95.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.94.3...v1.95.0) (2019-01-11)


### Features

* **branches:** covers api for timzeone and currency, fixes type requirements ([ade7244](https://github.com/tillhub/tillhub-sdk-javascript/commit/ade7244))

## [1.94.3](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.94.2...v1.94.3) (2019-01-10)


### Bug Fixes

* annotate next cursor types ([978cc13](https://github.com/tillhub/tillhub-sdk-javascript/commit/978cc13))

## [1.94.2](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.94.1...v1.94.2) (2019-01-10)


### Bug Fixes

* fix all next cursors ([7495e35](https://github.com/tillhub/tillhub-sdk-javascript/commit/7495e35))

## [1.94.1](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.94.0...v1.94.1) (2019-01-10)


### Bug Fixes

* **customers:** return function that returns a promise instead of triggering promise immediately ([03472de](https://github.com/tillhub/tillhub-sdk-javascript/commit/03472de))

# [1.94.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.93.0...v1.94.0) (2019-01-10)


### Features

* **customers:** add query to meta ([eae544f](https://github.com/tillhub/tillhub-sdk-javascript/commit/eae544f))

# [1.93.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.92.0...v1.93.0) (2019-01-10)


### Features

* images: updated header content type ([28b6825](https://github.com/tillhub/tillhub-sdk-javascript/commit/28b6825))

# [1.92.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.91.0...v1.92.0) (2019-01-10)


### Features

* **master data:** allow queries ([f443baf](https://github.com/tillhub/tillhub-sdk-javascript/commit/f443baf))

# [1.91.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.90.0...v1.91.0) (2019-01-10)


### Features

* adds delete handlers for master data handlers ([0d3adb8](https://github.com/tillhub/tillhub-sdk-javascript/commit/0d3adb8))

# [1.90.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.89.0...v1.90.0) (2019-01-09)


### Features

* **analytics:** added handler for revenues sum for time range ([299947a](https://github.com/tillhub/tillhub-sdk-javascript/commit/299947a))

# [1.89.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.88.0...v1.89.0) (2019-01-08)


### Features

* **product_groups:** allow embedding into product groups ([697dce3](https://github.com/tillhub/tillhub-sdk-javascript/commit/697dce3))

# [1.88.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.87.1...v1.88.0) (2019-01-08)


### Features

* **accounts:** allow querying for account types ([1f6eaab](https://github.com/tillhub/tillhub-sdk-javascript/commit/1f6eaab))

## [1.87.1](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.87.0...v1.87.1) (2019-01-07)


### Bug Fixes

* **users:** fixes prop order in post url ([09091ec](https://github.com/tillhub/tillhub-sdk-javascript/commit/09091ec))

# [1.87.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.86.4...v1.87.0) (2019-01-07)


### Bug Fixes

* **users:** fixes put url ref ([ff9dda3](https://github.com/tillhub/tillhub-sdk-javascript/commit/ff9dda3))


### Features

* **users:** covers deletion ([bab6ebf](https://github.com/tillhub/tillhub-sdk-javascript/commit/bab6ebf))

## [1.86.4](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.86.3...v1.86.4) (2019-01-07)


### Bug Fixes

* **users:** removes excessive route prop ([7aabd1b](https://github.com/tillhub/tillhub-sdk-javascript/commit/7aabd1b))

## [1.86.3](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.86.2...v1.86.3) (2019-01-07)


### Bug Fixes

* **users:** fixes missing route prop ([14f977c](https://github.com/tillhub/tillhub-sdk-javascript/commit/14f977c))

## [1.86.2](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.86.1...v1.86.2) (2019-01-07)


### Bug Fixes

* **users:** fixes ref to options config id ([3777ef6](https://github.com/tillhub/tillhub-sdk-javascript/commit/3777ef6))

## [1.86.1](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.86.0...v1.86.1) (2019-01-07)


### Bug Fixes

* **users:** fixes url ref, hint about current implementation status through typeerror ([fbd7a48](https://github.com/tillhub/tillhub-sdk-javascript/commit/fbd7a48))

# [1.86.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.85.0...v1.86.0) (2019-01-07)


### Bug Fixes

* **users:** fixes users ref ([7a5febd](https://github.com/tillhub/tillhub-sdk-javascript/commit/7a5febd))


### Features

* **sdk:** cover configurations, add users ([775b3ec](https://github.com/tillhub/tillhub-sdk-javascript/commit/775b3ec))

# [1.85.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.84.0...v1.85.0) (2019-01-07)


### Features

* added image handler for assets api ([3108aae](https://github.com/tillhub/tillhub-sdk-javascript/commit/3108aae))

# [1.84.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.83.0...v1.84.0) (2019-01-03)


### Bug Fixes

* **customers:** fix by cast to customer response ([7b64a4a](https://github.com/tillhub/tillhub-sdk-javascript/commit/7b64a4a))


### Features

* **customers:** extend to cover baseline of api ([ab9f80c](https://github.com/tillhub/tillhub-sdk-javascript/commit/ab9f80c))

# [1.83.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.82.0...v1.83.0) (2019-01-03)


### Features

* use generic factory for sdk callables ([aec9f19](https://github.com/tillhub/tillhub-sdk-javascript/commit/aec9f19))

# [1.82.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.81.0...v1.82.0) (2019-01-03)


### Features

* **accounting:** adds payment options ([fdf128a](https://github.com/tillhub/tillhub-sdk-javascript/commit/fdf128a))
* adds expense accounts and accounts ([6caf18c](https://github.com/tillhub/tillhub-sdk-javascript/commit/6caf18c))

# [1.81.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.80.0...v1.81.0) (2019-01-03)


### Features

* **taxes:** cover api ([3d347ca](https://github.com/tillhub/tillhub-sdk-javascript/commit/3d347ca))

# [1.80.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.79.4...v1.80.0) (2019-01-03)


### Features

* **product_groups:** complete api coverage ([cf7ae6f](https://github.com/tillhub/tillhub-sdk-javascript/commit/cf7ae6f))

## [1.79.4](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.79.3...v1.79.4) (2019-01-02)


### Bug Fixes

* **client:** use new headers in any case ([54b6852](https://github.com/tillhub/tillhub-sdk-javascript/commit/54b6852))

## [1.79.3](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.79.2...v1.79.3) (2019-01-02)


### Bug Fixes

* adds some compile targets to git tree ([7d9447f](https://github.com/tillhub/tillhub-sdk-javascript/commit/7d9447f))
* dist ([b1dd089](https://github.com/tillhub/tillhub-sdk-javascript/commit/b1dd089))
* lower root ([aa47220](https://github.com/tillhub/tillhub-sdk-javascript/commit/aa47220))

## [1.79.2](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.79.1...v1.79.2) (2019-01-02)


### Bug Fixes

* dist ([de11d7c](https://github.com/tillhub/tillhub-sdk-javascript/commit/de11d7c))
* dist ([729f5a3](https://github.com/tillhub/tillhub-sdk-javascript/commit/729f5a3))

## [1.79.1](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.79.0...v1.79.1) (2019-01-02)


### Bug Fixes

* makes pkg available in prod ([9e85d9d](https://github.com/tillhub/tillhub-sdk-javascript/commit/9e85d9d))

# [1.79.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.78.0...v1.79.0) (2019-01-02)


### Bug Fixes

* **chore:** adds dotenv type ref ([dc3c173](https://github.com/tillhub/tillhub-sdk-javascript/commit/dc3c173))
* **chore:** fixes linitng issues on version mismatch ([d96545f](https://github.com/tillhub/tillhub-sdk-javascript/commit/d96545f))
* **chore:** removes lint-staged ([20a8245](https://github.com/tillhub/tillhub-sdk-javascript/commit/20a8245))
* **errors:** extend properly from error ([255290b](https://github.com/tillhub/tillhub-sdk-javascript/commit/255290b))
* **linter:** adds some more explicit casts ([451e44a](https://github.com/tillhub/tillhub-sdk-javascript/commit/451e44a))
* **sdk:** strictly initialise auth ([6d85ce7](https://github.com/tillhub/tillhub-sdk-javascript/commit/6d85ce7))


### Features

* **errors enhance error visibility:** prepares emitting errors ([def2e55](https://github.com/tillhub/tillhub-sdk-javascript/commit/def2e55))
* **sdk:** adds destroy ([a89806c](https://github.com/tillhub/tillhub-sdk-javascript/commit/a89806c))
* **tillhub:** adds environment information ([6913937](https://github.com/tillhub/tillhub-sdk-javascript/commit/6913937))

# [1.78.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.77.0...v1.78.0) (2019-01-02)


### Features

* **audit-actions:** Revert changing response return value "next" ([26a4b94](https://github.com/tillhub/tillhub-sdk-javascript/commit/26a4b94))

# [1.77.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.76.0...v1.77.0) (2019-01-02)


### Features

* **audit-actions:** Change return value "next" to be a function ([e42d1b4](https://github.com/tillhub/tillhub-sdk-javascript/commit/e42d1b4))

# [1.76.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.75.0...v1.76.0) (2019-01-02)


### Features

* **audit-actions:** add next cursor in reponse ([3ccf52d](https://github.com/tillhub/tillhub-sdk-javascript/commit/3ccf52d))
* **audit-actions:** pass on query params into next ([81a88ca](https://github.com/tillhub/tillhub-sdk-javascript/commit/81a88ca))

# [1.75.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.74.0...v1.75.0) (2019-01-02)


### Features

* **audit actions:** Change return result of meta ([7c428f2](https://github.com/tillhub/tillhub-sdk-javascript/commit/7c428f2))

# [1.74.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.73.0...v1.74.0) (2018-12-27)


### Features

* **tx:** expose zero receipts ([d23bde3](https://github.com/tillhub/tillhub-sdk-javascript/commit/d23bde3))

# [1.73.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.72.0...v1.73.0) (2018-12-21)


### Features

* **auditActions:** Refactor audits handlers according to convention in order to be used in th-datat ([ce0228c](https://github.com/tillhub/tillhub-sdk-javascript/commit/ce0228c))

# [1.72.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.71.0...v1.72.0) (2018-12-18)


### Features

* **auth:** adds runtime inference for org auth ([9cdada8](https://github.com/tillhub/tillhub-sdk-javascript/commit/9cdada8))

# [1.71.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.70.1...v1.71.0) (2018-12-18)


### Features

* **auth:** adds org auth handler ([48ca75c](https://github.com/tillhub/tillhub-sdk-javascript/commit/48ca75c))

## [1.70.1](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.70.0...v1.70.1) (2018-12-18)


### Bug Fixes

* **tx:** aligngs signing handlers to API, adds correct errors ([e4dfa45](https://github.com/tillhub/tillhub-sdk-javascript/commit/e4dfa45))

# [1.70.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.69.0...v1.70.0) (2018-12-18)


### Features

* **tx:** adds yearly and monthly receipts ([7d0c1e2](https://github.com/tillhub/tillhub-sdk-javascript/commit/7d0c1e2))

# [1.69.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.68.0...v1.69.0) (2018-12-17)


### Features

* **audits:** Add handlers for audits endpoint ([6f18948](https://github.com/tillhub/tillhub-sdk-javascript/commit/6f18948))
* **audits:** Change message of error messages ([2ddee7b](https://github.com/tillhub/tillhub-sdk-javascript/commit/2ddee7b))

# [1.68.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.67.0...v1.68.0) (2018-12-17)


### Features

* added query inputs ([d8132cc](https://github.com/tillhub/tillhub-sdk-javascript/commit/d8132cc))

# [1.67.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.66.2...v1.67.0) (2018-12-17)


### Features

* **anaytics/reports/vouchers:** added amount and currency options ([ba8ef7d](https://github.com/tillhub/tillhub-sdk-javascript/commit/ba8ef7d))

## [1.66.2](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.66.1...v1.66.2) (2018-12-11)


### Bug Fixes

* **analytics:** renamed the property input from search to q ([e97d233](https://github.com/tillhub/tillhub-sdk-javascript/commit/e97d233))

## [1.66.1](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.66.0...v1.66.1) (2018-12-10)


### Bug Fixes

* **tx:** retires unused tx v0 ([1fa13e6](https://github.com/tillhub/tillhub-sdk-javascript/commit/1fa13e6))

# [1.66.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.65.0...v1.66.0) (2018-12-10)


### Features

* **tx:** adds signing handler ([fee246f](https://github.com/tillhub/tillhub-sdk-javascript/commit/fee246f))

# [1.65.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.64.0...v1.65.0) (2018-12-10)


### Features

* **v0/analytics/getReportsProducts:** added search and format input options ([437a1a5](https://github.com/tillhub/tillhub-sdk-javascript/commit/437a1a5))

# [1.64.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.63.0...v1.64.0) (2018-12-07)


### Features

* **analytics:** add staff reports products handler ([8913b94](https://github.com/tillhub/tillhub-sdk-javascript/commit/8913b94))

# [1.63.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.62.0...v1.63.0) (2018-12-07)


### Features

* **products:** adds meta; removes getOne; adds get ([aeca7ee](https://github.com/tillhub/tillhub-sdk-javascript/commit/aeca7ee))

# [1.62.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.61.2...v1.62.0) (2018-12-06)


### Features

* **vouchers:** expose logs class ([c253544](https://github.com/tillhub/tillhub-sdk-javascript/commit/c253544))

## [1.61.2](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.61.1...v1.61.2) (2018-12-06)


### Bug Fixes

* **docs:** fixes docs; need to trigger release ([b4ae787](https://github.com/tillhub/tillhub-sdk-javascript/commit/b4ae787))

## [1.61.1](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.61.0...v1.61.1) (2018-12-05)


### Bug Fixes

* **errors:** fixes error naming ([8095b2f](https://github.com/tillhub/tillhub-sdk-javascript/commit/8095b2f))

# [1.61.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.60.0...v1.61.0) (2018-12-05)


### Features

* **branches:** adds create handler ([2b43c5d](https://github.com/tillhub/tillhub-sdk-javascript/commit/2b43c5d))

# [1.60.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.59.0...v1.60.0) (2018-12-05)


### Features

* **branches:** adds get one and put one ([215a4ac](https://github.com/tillhub/tillhub-sdk-javascript/commit/215a4ac))

# [1.59.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.58.0...v1.59.0) (2018-12-04)


### Features

* **vouchers:** allow querying with limit ([9794caf](https://github.com/tillhub/tillhub-sdk-javascript/commit/9794caf))

# [1.58.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.57.0...v1.58.0) (2018-12-04)


### Features

* **vouchers:** adds meta ([253904a](https://github.com/tillhub/tillhub-sdk-javascript/commit/253904a))

# [1.57.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.56.0...v1.57.0) (2018-12-03)


### Features

* using qs.stringify to get query and added filter test ([96b0764](https://github.com/tillhub/tillhub-sdk-javascript/commit/96b0764))
* **analytics.getVouchersReports:** allow getVouchersReport to take query parameters ([efa26ef](https://github.com/tillhub/tillhub-sdk-javascript/commit/efa26ef))

# [1.56.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.55.0...v1.56.0) (2018-11-30)


### Features

* **configurations:** allow querying client account config ([e0fd087](https://github.com/tillhub/tillhub-sdk-javascript/commit/e0fd087))

# [1.55.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.54.1...v1.55.0) (2018-11-30)


### Features

* **invoices:** Add meta handler ([6ef2082](https://github.com/tillhub/tillhub-sdk-javascript/commit/6ef2082))
* expose features from login ([9667675](https://github.com/tillhub/tillhub-sdk-javascript/commit/9667675))

## [1.54.1](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.54.0...v1.54.1) (2018-11-23)


### Bug Fixes

* **analytics:** make fetching methods work with and without staff id ([0a892c4](https://github.com/tillhub/tillhub-sdk-javascript/commit/0a892c4))

# [1.54.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.53.0...v1.54.0) (2018-11-22)


### Features

* **analytics:** added vouchers reports handler in analytics ([3afabd0](https://github.com/tillhub/tillhub-sdk-javascript/commit/3afabd0))

# [1.53.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.52.1...v1.53.0) (2018-11-21)


### Features

* **analytics:** add handler for product groups report per one staff member ([d9c5a56](https://github.com/tillhub/tillhub-sdk-javascript/commit/d9c5a56))
* **analytics:** add handler for refunds report per one staff member; renaming stuff; ([7decc2e](https://github.com/tillhub/tillhub-sdk-javascript/commit/7decc2e))
* **analytics:** add product groups report handler ([2fb5ca2](https://github.com/tillhub/tillhub-sdk-javascript/commit/2fb5ca2))
* **analytics:** add refunds report per all staff handler ([f8ebb43](https://github.com/tillhub/tillhub-sdk-javascript/commit/f8ebb43))

## [1.52.1](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.52.0...v1.52.1) (2018-11-16)


### Bug Fixes

* **analytics:** Fixed analytics/getReportsProducts to return response.data.results ([0616b67](https://github.com/tillhub/tillhub-sdk-javascript/commit/0616b67))

# [1.52.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.51.2...v1.52.0) (2018-11-16)


### Features

* **analytics:** add staff report handler ([98e38ca](https://github.com/tillhub/tillhub-sdk-javascript/commit/98e38ca))

## [1.51.2](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.51.1...v1.51.2) (2018-11-15)


### Bug Fixes

* fixed the query interface for analytics getReportsProducts ([2e47d9f](https://github.com/tillhub/tillhub-sdk-javascript/commit/2e47d9f))

## [1.51.1](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.51.0...v1.51.1) (2018-11-12)


### Bug Fixes

* fixed the query interface for analytics getReportsProducts ([fd22f2f](https://github.com/tillhub/tillhub-sdk-javascript/commit/fd22f2f))

# [1.51.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.50.0...v1.51.0) (2018-11-09)


### Features

* **analytics:** added getReportsProducts method ([e6c9842](https://github.com/tillhub/tillhub-sdk-javascript/commit/e6c9842))

# [1.50.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.49.0...v1.50.0) (2018-11-08)


### Features

* **v1.registers:** added get all registers ([5d792e8](https://github.com/tillhub/tillhub-sdk-javascript/commit/5d792e8))

# [1.49.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.48.1...v1.49.0) (2018-11-02)


### Features

* **Staff:** added Staff handler and getAll method ([b3e6394](https://github.com/tillhub/tillhub-sdk-javascript/commit/b3e6394))

## [1.48.1](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.48.0...v1.48.1) (2018-11-01)


### Bug Fixes

* **transactions_v1:** add headers to pdf call ([60b3944](https://github.com/tillhub/tillhub-sdk-javascript/commit/60b3944))

# [1.48.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.47.3...v1.48.0) (2018-11-01)


### Features

* **transactions_v1:** Add handler for getting pdf url ([e2b144d](https://github.com/tillhub/tillhub-sdk-javascript/commit/e2b144d))

## [1.47.3](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.47.2...v1.47.3) (2018-11-01)


### Bug Fixes

* **order items:** type interfaces for update and create ([9116849](https://github.com/tillhub/tillhub-sdk-javascript/commit/9116849))

## [1.47.2](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.47.1...v1.47.2) (2018-11-01)


### Bug Fixes

* **order items:** mistake in uri ([bf49cab](https://github.com/tillhub/tillhub-sdk-javascript/commit/bf49cab))

## [1.47.1](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.47.0...v1.47.1) (2018-10-31)


### Bug Fixes

* **order items:** fix updateOrderItems params shape ([d67499e](https://github.com/tillhub/tillhub-sdk-javascript/commit/d67499e))

# [1.47.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.46.3...v1.47.0) (2018-10-31)


### Features

* **orders:** add create orders ([6c9a582](https://github.com/tillhub/tillhub-sdk-javascript/commit/6c9a582))
* **orders:** add update order item handler ([cf5403e](https://github.com/tillhub/tillhub-sdk-javascript/commit/cf5403e))

## [1.46.3](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.46.2...v1.46.3) (2018-10-30)


### Bug Fixes

* **orders:** add alowed statuses ([9ad03fe](https://github.com/tillhub/tillhub-sdk-javascript/commit/9ad03fe))

## [1.46.2](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.46.1...v1.46.2) (2018-10-30)


### Bug Fixes

* **orders:** another mistake in deleteOrderItems uri ([cb71af3](https://github.com/tillhub/tillhub-sdk-javascript/commit/cb71af3))

## [1.46.1](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.46.0...v1.46.1) (2018-10-30)


### Bug Fixes

* **orders:** mistake in uri ([8fcaddd](https://github.com/tillhub/tillhub-sdk-javascript/commit/8fcaddd))

# [1.46.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.45.0...v1.46.0) (2018-10-29)


### Features

* **orders:** add book stock, and get historic order items and open order handlers ([ccdd630](https://github.com/tillhub/tillhub-sdk-javascript/commit/ccdd630))

# [1.45.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.44.0...v1.45.0) (2018-10-27)


### Features

* **vouchers:** implements patch ([06c7633](https://github.com/tillhub/tillhub-sdk-javascript/commit/06c7633))

# [1.44.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.43.0...v1.44.0) (2018-10-26)


### Bug Fixes

* **orders:** fix uri for get and delete order items and add order suggestions ([0926a9c](https://github.com/tillhub/tillhub-sdk-javascript/commit/0926a9c))


### Features

* **orders:** add orders update ([9efd7aa](https://github.com/tillhub/tillhub-sdk-javascript/commit/9efd7aa))

# [1.43.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.42.0...v1.43.0) (2018-10-26)


### Features

* **analytics:** added getRevenueForHourOfDay to analytics in V0 ([b28168a](https://github.com/tillhub/tillhub-sdk-javascript/commit/b28168a))

# [1.42.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.41.0...v1.42.0) (2018-10-26)


### Features

* **order items:** add order items CRUD ([3e1f563](https://github.com/tillhub/tillhub-sdk-javascript/commit/3e1f563))

# [1.41.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.40.0...v1.41.0) (2018-10-26)


### Features

* **vouchers:** adds crud routes ([a54ab15](https://github.com/tillhub/tillhub-sdk-javascript/commit/a54ab15))

# [1.40.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.39.0...v1.40.0) (2018-10-26)


### Features

* **analytics:** added analytics in v0 and added test ([7151d7c](https://github.com/tillhub/tillhub-sdk-javascript/commit/7151d7c))

# [1.39.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.38.0...v1.39.0) (2018-10-25)


### Features

* **orders:** add orders handler and fetching methods ([ef23797](https://github.com/tillhub/tillhub-sdk-javascript/commit/ef23797))

# [1.38.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.37.0...v1.38.0) (2018-10-25)


### Features

* **invoices:** Handle query parameters in invoices-get-all ([b82fe07](https://github.com/tillhub/tillhub-sdk-javascript/commit/b82fe07))

# [1.37.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.36.1...v1.37.0) (2018-10-25)


### Features

* **invoices:** Add query param to invoices-get-all ([4b37b5d](https://github.com/tillhub/tillhub-sdk-javascript/commit/4b37b5d))

## [1.36.1](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.36.0...v1.36.1) (2018-10-25)


### Bug Fixes

* **invoices:** Small fix in test ([bf1e0fa](https://github.com/tillhub/tillhub-sdk-javascript/commit/bf1e0fa))

# [1.36.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.35.1...v1.36.0) (2018-10-25)


### Features

* **invoices:** Add more detailed error message ([5b33d79](https://github.com/tillhub/tillhub-sdk-javascript/commit/5b33d79))

## [1.35.1](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.35.0...v1.35.1) (2018-10-25)


### Bug Fixes

* **stocks:** fix stocks endpoint to singular ([4b548c5](https://github.com/tillhub/tillhub-sdk-javascript/commit/4b548c5))

# [1.35.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.34.0...v1.35.0) (2018-10-25)


### Features

* **products:** get products by query ([ec991d6](https://github.com/tillhub/tillhub-sdk-javascript/commit/ec991d6))

# [1.34.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.33.0...v1.34.0) (2018-10-25)


### Features

* **stocks:** add create and update handlers ([4c4cc15](https://github.com/tillhub/tillhub-sdk-javascript/commit/4c4cc15))

# [1.33.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.32.0...v1.33.0) (2018-10-24)


### Features

* **stocks:** add stocks handler - get all and get locations ([b164261](https://github.com/tillhub/tillhub-sdk-javascript/commit/b164261))

# [1.32.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.31.0...v1.32.0) (2018-10-24)


### Features

* **invoices:** Add query params to invoices-get-all handler ([b61f35b](https://github.com/tillhub/tillhub-sdk-javascript/commit/b61f35b))

# [1.31.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.30.1...v1.31.0) (2018-10-24)


### Features

* **invoices:** Add query params to invoices-get-all handler ([52e6a9e](https://github.com/tillhub/tillhub-sdk-javascript/commit/52e6a9e))

## [1.30.1](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.30.0...v1.30.1) (2018-10-18)


### Bug Fixes

* **products:** fix typo in search uri ([17a45c8](https://github.com/tillhub/tillhub-sdk-javascript/commit/17a45c8))

# [1.30.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.29.0...v1.30.0) (2018-10-17)


### Features

* Add invoices handlers ([b46b769](https://github.com/tillhub/tillhub-sdk-javascript/commit/b46b769))

# [1.29.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.28.1...v1.29.0) (2018-10-15)


### Features

* **products:** add search handler ([6564aaf](https://github.com/tillhub/tillhub-sdk-javascript/commit/6564aaf))

## [1.28.1](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.28.0...v1.28.1) (2018-10-12)


### Bug Fixes

* **vouchers:** add missing pagination to vouchers logs getAll method ([a44e3a9](https://github.com/tillhub/tillhub-sdk-javascript/commit/a44e3a9))

# [1.28.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.27.0...v1.28.0) (2018-10-11)


### Bug Fixes

* **vouchers:** fix typo in file path ([0abe131](https://github.com/tillhub/tillhub-sdk-javascript/commit/0abe131))


### Features

* **vouchers:** add count and getAll methods for vouchers and vouchers logs ([7acb83c](https://github.com/tillhub/tillhub-sdk-javascript/commit/7acb83c))

# [1.27.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.26.0...v1.27.0) (2018-10-11)


### Features

* **customers:** add customer delete method ([f6c371a](https://github.com/tillhub/tillhub-sdk-javascript/commit/f6c371a))

# [1.26.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.25.2...v1.26.0) (2018-10-11)


### Features

* **customers:** add customers handler with count and getAll methods ([deff6b5](https://github.com/tillhub/tillhub-sdk-javascript/commit/deff6b5))

## [1.25.2](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.25.1...v1.25.2) (2018-10-09)


### Bug Fixes

* **branches:** add response status check and tests ([6cd1b47](https://github.com/tillhub/tillhub-sdk-javascript/commit/6cd1b47))
* **sdk:** add response status checks and tests ([dc4c3b2](https://github.com/tillhub/tillhub-sdk-javascript/commit/dc4c3b2))

## [1.25.1](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.25.0...v1.25.1) (2018-10-09)


### Bug Fixes

* **branches:** add branches count test and error handler ([bcb99b0](https://github.com/tillhub/tillhub-sdk-javascript/commit/bcb99b0))

# [1.25.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.24.0...v1.25.0) (2018-10-09)


### Features

* **branches:** add count method to branches ([75e8bba](https://github.com/tillhub/tillhub-sdk-javascript/commit/75e8bba))

# [1.24.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.23.0...v1.24.0) (2018-10-05)


### Features

* **products:** add handler to count number of total products ([bfa0c64](https://github.com/tillhub/tillhub-sdk-javascript/commit/bfa0c64))

# [1.23.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.22.1...v1.23.0) (2018-10-05)


### Features

* **products:** add get all products handler ([adf2308](https://github.com/tillhub/tillhub-sdk-javascript/commit/adf2308))

## [1.22.1](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.22.0...v1.22.1) (2018-09-25)


### Bug Fixes

* Fix template preview headers ([46aef81](https://github.com/tillhub/tillhub-sdk-javascript/commit/46aef81))

# [1.22.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.21.1...v1.22.0) (2018-09-25)


### Features

* Add templates preview ([c2ec22c](https://github.com/tillhub/tillhub-sdk-javascript/commit/c2ec22c))

## [1.21.1](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.21.0...v1.21.1) (2018-09-24)


### Bug Fixes

* adds missing query ([fd2b7b4](https://github.com/tillhub/tillhub-sdk-javascript/commit/fd2b7b4))

# [1.21.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.20.0...v1.21.0) (2018-09-24)


### Features

* fixes put; fixes options ([10214ac](https://github.com/tillhub/tillhub-sdk-javascript/commit/10214ac))

# [1.20.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.19.0...v1.20.0) (2018-09-24)


### Features

* **branches:** add branches handler and getAll method ([b1fc3ab](https://github.com/tillhub/tillhub-sdk-javascript/commit/b1fc3ab))

# [1.19.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.18.1...v1.19.0) (2018-09-21)


### Bug Fixes

* **configurations:** fix typo ([6f75910](https://github.com/tillhub/tillhub-sdk-javascript/commit/6f75910))


### Features

* **configurations:** add configurations handler with get all method ([602e976](https://github.com/tillhub/tillhub-sdk-javascript/commit/602e976))

## [1.18.1](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.18.0...v1.18.1) (2018-09-18)


### Bug Fixes

* **products:** add product delete error message ([554dcda](https://github.com/tillhub/tillhub-sdk-javascript/commit/554dcda))

# [1.18.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.17.1...v1.18.0) (2018-09-18)


### Features

* **products:** add get, update and delete methods for a single product ([038a1ac](https://github.com/tillhub/tillhub-sdk-javascript/commit/038a1ac))

## [1.17.1](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.17.0...v1.17.1) (2018-09-17)


### Bug Fixes

* **products:** fix typos -- pluralize to products ([aa68955](https://github.com/tillhub/tillhub-sdk-javascript/commit/aa68955))
* **products:** try fix jsdoc asterisks alignment ([94621c8](https://github.com/tillhub/tillhub-sdk-javascript/commit/94621c8))

# [1.17.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.16.0...v1.17.0) (2018-09-16)


### Bug Fixes

* fixes after merging ([0d49df8](https://github.com/tillhub/tillhub-sdk-javascript/commit/0d49df8))
* **build:** update deps to unhang ([47aaeee](https://github.com/tillhub/tillhub-sdk-javascript/commit/47aaeee))


### Features

* adds templates ([a95a75b](https://github.com/tillhub/tillhub-sdk-javascript/commit/a95a75b))

# [1.16.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.15.0...v1.16.0) (2018-09-14)


### Features

* Add CRUD methods to delivery items handler ([9eb68d8](https://github.com/tillhub/tillhub-sdk-javascript/commit/9eb68d8))

# [1.15.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.14.2...v1.15.0) (2018-09-14)


### Features

* **product:** fix endpoint typo ([0967ba2](https://github.com/tillhub/tillhub-sdk-javascript/commit/0967ba2))

## [1.14.2](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.14.1...v1.14.2) (2018-09-14)


### Bug Fixes

* Change custom header in create delievery pdf ([e4425be](https://github.com/tillhub/tillhub-sdk-javascript/commit/e4425be))

## [1.14.1](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.14.0...v1.14.1) (2018-09-14)


### Bug Fixes

* Set custom header in create delivery pdf ([2bcd1d9](https://github.com/tillhub/tillhub-sdk-javascript/commit/2bcd1d9))

# [1.14.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.13.0...v1.14.0) (2018-09-14)


### Features

* **accounts:** add accounts handler and getAll method ([6712c72](https://github.com/tillhub/tillhub-sdk-javascript/commit/6712c72))

# [1.13.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.12.0...v1.13.0) (2018-09-14)


### Features

* **product groups:** add product groups hander and get all method ([a0dbcd0](https://github.com/tillhub/tillhub-sdk-javascript/commit/a0dbcd0))

# [1.12.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.11.1...v1.12.0) (2018-09-14)


### Features

* Add create delivery PDF handler ([8d6a06a](https://github.com/tillhub/tillhub-sdk-javascript/commit/8d6a06a))
* Remove custom header from delivery pdf handler ([45dcf15](https://github.com/tillhub/tillhub-sdk-javascript/commit/45dcf15))

## [1.11.1](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.11.0...v1.11.1) (2018-09-13)


### Bug Fixes

* Change all delivery IDs to be moved out of query in request object ([903f5e1](https://github.com/tillhub/tillhub-sdk-javascript/commit/903f5e1))

# [1.11.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.10.0...v1.11.0) (2018-09-13)


### Features

* Add dispatch and in_progress handlers to deliveries ([fabab75](https://github.com/tillhub/tillhub-sdk-javascript/commit/fabab75))

# [1.10.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.9.0...v1.10.0) (2018-09-13)


### Features

* Add getOne handler for deliveries ([5e3798e](https://github.com/tillhub/tillhub-sdk-javascript/commit/5e3798e))

# [1.9.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.8.1...v1.9.0) (2018-09-13)


### Features

* Add all CRUD handlers for deliveries ([9fde382](https://github.com/tillhub/tillhub-sdk-javascript/commit/9fde382))

## [1.8.1](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.8.0...v1.8.1) (2018-09-12)


### Bug Fixes

* Add query string handling to deliveries ([05639b0](https://github.com/tillhub/tillhub-sdk-javascript/commit/05639b0))

# [1.8.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.7.0...v1.8.0) (2018-09-12)


### Features

* Add deliveries API ([491a708](https://github.com/tillhub/tillhub-sdk-javascript/commit/491a708))

# [1.7.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.6.0...v1.7.0) (2018-09-12)


### Bug Fixes

* **global:** fix imports ([7ba42a4](https://github.com/tillhub/tillhub-sdk-javascript/commit/7ba42a4))
* **product:** fix more imports ([0002634](https://github.com/tillhub/tillhub-sdk-javascript/commit/0002634))
* **product:** rename file without caps ([3d58dad](https://github.com/tillhub/tillhub-sdk-javascript/commit/3d58dad))
* **tillhub-js:** fix duplicate import ([4aa6cb8](https://github.com/tillhub/tillhub-sdk-javascript/commit/4aa6cb8))


### Features

* **product:** add product endpoint and createProduct  method ([812003b](https://github.com/tillhub/tillhub-sdk-javascript/commit/812003b))

# [1.6.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.5.0...v1.6.0) (2018-09-11)


### Bug Fixes

* check for auth on taxes ([811eac1](https://github.com/tillhub/tillhub-sdk-javascript/commit/811eac1))
* fixes last case sensitive cases ([8ef6da4](https://github.com/tillhub/tillhub-sdk-javascript/commit/8ef6da4))
* fixes type after rebase ([2c5a36c](https://github.com/tillhub/tillhub-sdk-javascript/commit/2c5a36c))
* rename case sensitive naming ([d081960](https://github.com/tillhub/tillhub-sdk-javascript/commit/d081960))


### Features

* be able to rehydrate from token ([88dbec3](https://github.com/tillhub/tillhub-sdk-javascript/commit/88dbec3))

# [1.5.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.4.0...v1.5.0) (2018-09-11)


### Features

* **taxes:** Add taxes endpoint ([38c35a9](https://github.com/tillhub/tillhub-sdk-javascript/commit/38c35a9))

# [1.4.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.3.9...v1.4.0) (2018-09-10)


### Features

* **auth:** exposes name ([9bb1f71](https://github.com/tillhub/tillhub-sdk-javascript/commit/9bb1f71))

## [1.3.9](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.3.8...v1.3.9) (2018-09-10)


### Bug Fixes

* fixes test after promise throw change ([0cbac16](https://github.com/tillhub/tillhub-sdk-javascript/commit/0cbac16))
* refactor for simple err throw ([0e4ef96](https://github.com/tillhub/tillhub-sdk-javascript/commit/0e4ef96))

## [1.3.8](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.3.7...v1.3.8) (2018-09-10)


### Bug Fixes

* fixes main ([386cc65](https://github.com/tillhub/tillhub-sdk-javascript/commit/386cc65))

## [1.3.7](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.3.6...v1.3.7) (2018-09-10)


### Bug Fixes

* makes lib runnable; adds storybook ([272131a](https://github.com/tillhub/tillhub-sdk-javascript/commit/272131a))

## [1.3.6](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.3.5...v1.3.6) (2018-09-04)


### Bug Fixes

* revert back to bundling with rollup ([e2457c8](https://github.com/tillhub/tillhub-sdk-javascript/commit/e2457c8))

## [1.3.5](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.3.4...v1.3.5) (2018-09-04)


### Bug Fixes

* fixes build script to bundle ([bb3d9e0](https://github.com/tillhub/tillhub-sdk-javascript/commit/bb3d9e0))

## [1.3.4](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.3.3...v1.3.4) (2018-09-04)


### Bug Fixes

* adds axios as dep ([928c381](https://github.com/tillhub/tillhub-sdk-javascript/commit/928c381))
* fixes dist publish ([2cca017](https://github.com/tillhub/tillhub-sdk-javascript/commit/2cca017))

## [1.3.3](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.3.2...v1.3.3) (2018-09-04)


### Bug Fixes

* use webpack to bundle ([c740d9e](https://github.com/tillhub/tillhub-sdk-javascript/commit/c740d9e))

# [1.3.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.2.0...v1.3.0) (2018-09-03)


### Bug Fixes

* fixes linting ([b373cfb](https://github.com/tillhub/tillhub-sdk-javascript/commit/b373cfb))


### Features

* make runnable without much assumptions ([f53f92f](https://github.com/tillhub/tillhub-sdk-javascript/commit/f53f92f))

# [1.2.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.1.2...v1.2.0) (2018-09-03)


### Features

* **sdk:** adds singleton with handling options correctly ([ad54dc2](https://github.com/tillhub/tillhub-sdk-javascript/commit/ad54dc2))

## [1.1.2](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.1.1...v1.1.2) (2018-09-03)


### Bug Fixes

* **build:** fixes including docs into package ([029e6a4](https://github.com/tillhub/tillhub-sdk-javascript/commit/029e6a4))
* **docs:** fixes indentation in docs ([9c6c160](https://github.com/tillhub/tillhub-sdk-javascript/commit/9c6c160))

## [1.1.1](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.1.0...v1.1.1) (2018-09-03)


### Bug Fixes

* **build:** skip ci for pages ([bf7ca18](https://github.com/tillhub/tillhub-sdk-javascript/commit/bf7ca18))

# [1.1.0](https://github.com/tillhub/tillhub-sdk-javascript/compare/v1.0.0...v1.1.0) (2018-09-03)


### Bug Fixes

* **build:** fixes release script ([f8db075](https://github.com/tillhub/tillhub-sdk-javascript/commit/f8db075))
* **build:** fixes releasing ([6f8ff66](https://github.com/tillhub/tillhub-sdk-javascript/commit/6f8ff66))


### Features

* adds init and auth through class ([9a9724c](https://github.com/tillhub/tillhub-sdk-javascript/commit/9a9724c))
* **transactions:** adds transactions get all ([6f5b320](https://github.com/tillhub/tillhub-sdk-javascript/commit/6f5b320))

# 1.0.0 (2018-07-15)


### Bug Fixes

* fixes path ref on Linux ([3133d3a](https://github.com/tillhub/tillhub-sdk-javascript/commit/3133d3a))
* **build:** allows lower threshold ([8198653](https://github.com/tillhub/tillhub-sdk-javascript/commit/8198653))
* **build:** fixes buildability due to failed coverage ([525a167](https://github.com/tillhub/tillhub-sdk-javascript/commit/525a167))
* **build:** fixes circle gh run ([0d3b85c](https://github.com/tillhub/tillhub-sdk-javascript/commit/0d3b85c))
* **build:** fixes missing script ([fe41526](https://github.com/tillhub/tillhub-sdk-javascript/commit/fe41526))
* **build:** fixes out of sync package ([9132339](https://github.com/tillhub/tillhub-sdk-javascript/commit/9132339))
* **build:** fixes testability ([1db3bd6](https://github.com/tillhub/tillhub-sdk-javascript/commit/1db3bd6))
* **release:** fixes automatic release ([5d66f33](https://github.com/tillhub/tillhub-sdk-javascript/commit/5d66f33))
