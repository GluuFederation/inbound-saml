export class InvalidRequestError extends Error {
  constructor(msg: string) {
    super(`InvalidRequestError: ${msg}`)
    this.name = 'InvalidRequestError'
  }
}
