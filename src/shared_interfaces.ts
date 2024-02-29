export interface exportJobQuery {
  columnNames: boolean
  columns?: string[]
  delimiter: 'semicolon' | 'comma'
  documentType: string
  enclosure: 'single' | 'double'
  email: string
  emailTemplate?: string
  timezone?: string | null
  filenamePrefix?: string | null
  format: 'csv' | 'xls'
  interval?: '1 day' | '7 days' | '1 mons'
  startDate?: string | null
}
