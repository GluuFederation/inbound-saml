export class InvalidValueError extends Error {
  constructor(value: string) {
    super(`Invalid value for ${value}`)
    this.name = 'InvalidXmlError'
  }
}
