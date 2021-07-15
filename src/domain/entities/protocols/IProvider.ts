export interface IProvider {
  entrypoint: string // TODO: url
  cert: string | string[]
  providerName: string
  authnRequestBinding: 'HTTP-POST' | 'HTTP-Redirect'
}
