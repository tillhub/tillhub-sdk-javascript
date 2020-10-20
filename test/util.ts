import { TillhubClient } from '../src/tillhub-js'

export class LocalStorageMock {
  private store = {}

  clear (): void {
    this.store = {}
  }

  getItem (key: string): any {
    return (this.store as any)[key] || null
  }

  setItem (key: string, value: string | null): void {
    (this.store as any)[key] = value as any
  }

  removeItem (key: string): void {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete (this.store as any)[key]
  }
}

/**
 * Instantiate TillhubClient in the tests - reduce boilerplate
 */
export const initThInstance = async (): Promise<TillhubClient> => {
  const instance = new TillhubClient()
  instance.init(options)
  await instance.auth.loginUsername({
    username: user.username,
    password: user.password
  })
  return instance
}

const user = {
  username: 'test@example.com',
  password: '12345678',
  clientAccount: 'someuuid',
  apiKey: '12345678'
}

if (process.env.SYSTEM_TEST) {
  user.username = process.env.SYSTEM_TEST_USERNAME ?? user.username
  user.password = process.env.SYSTEM_TEST_PASSWORD ?? user.password
  user.clientAccount = process.env.SYSTEM_TEST_CLIENT_ACCOUNT_ID ?? user.clientAccount
  user.apiKey = process.env.SYSTEM_TEST_API_KEY ?? user.apiKey
}

const options = {
  credentials: {
    username: user.username,
    password: user.password
  },
  base: process.env.TILLHUB_BASE
}
