export class PersistenceError extends Error {
  constructor(message: string) {
    super(`PersistenceError: ${message}`)
    this.name = 'PersistenceError'
  }
}
