export class LocalStorageMock {
  private store = {}

  clear() {
    this.store = {}
  }

  getItem(key: string): any {
    return (this.store as any)[key] || null
  }

  setItem(key: string, value: string | null) {
    (this.store as any)[key] = value as any
  }

  removeItem(key: string) {
    delete (this.store as any)[key]
  }
}
