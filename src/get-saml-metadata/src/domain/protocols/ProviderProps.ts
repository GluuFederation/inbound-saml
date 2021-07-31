import { Entity } from '../types/Entity'

export interface ProviderProps {
  metadataUrlOrPath: string
  logoPath: string
  entrypoint: string // TODO: url
  cert: string | string[]
  providerName: string
  authnRequestBinding: 'HTTP-POST' | 'HTTP-Redirect'
}

export abstract class BaseProvider extends Entity<ProviderProps> {
  private readonly authenticationService
  constructor (
    props: ProviderProps,
    authenticationService: any
  ) {
    super(props)
    this.authenticationService = authenticationService
  }

  public authenticate (): any {
    this.authenticationService.authenticate()
  }
}

// criar provider do metadata
// metadata.load()
// ProviderAdapter(new Metadata(urlOrPath)) implements BaseProvider
