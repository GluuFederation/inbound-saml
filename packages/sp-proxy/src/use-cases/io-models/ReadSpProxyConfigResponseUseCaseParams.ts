export interface ReadSpProxyConfigResponseUseCaseParams {
  host: string
  requestedIdentifierFormat: string
  authnContextIdentifierFormat: string
  skipRequestCompression: boolean
  decryption: {
    privateKey: string
    cert: string
  }
  signing?: {
    privateKey: string
    cert: string
  }
}
