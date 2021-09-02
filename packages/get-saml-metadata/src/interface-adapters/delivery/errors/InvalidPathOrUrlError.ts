export class InvalidPathOrUrlError extends Error {
  constructor(pathOrUrl: string) {
    super(`Invalid pathOrUrl: ${pathOrUrl}`)
    this.name = 'InvalidPathOrUrlError'
  }
}
