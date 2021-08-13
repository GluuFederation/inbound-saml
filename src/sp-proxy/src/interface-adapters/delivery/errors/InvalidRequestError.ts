export class InvalidRequestError extends Error {
  constructor(msg: string) {
    super(msg)
    this.name = 'InvalidRequestError'
  }
}
