export class UmaHeaderError extends Error {
  constructor(message: string) {
    super(`UmaHeaderError: ${message}`)
    this.name = 'UmaHeaderError'
  }
}
