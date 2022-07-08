import { IEnvLoader } from './protocols/IEnvLoader'
import { IOxTrustApiSettings } from './protocols/IOxTrustApiSettings'
import { IPersistenceConfigLoader } from './protocols/IPersistenceConfigLoader'
import { IValidator } from './protocols/IValidator'

/**
 * export interface IOxTrustApiSettings {
  host: string
  clientId: string
  completePath: string
  tokenUrl: string
  kid: string
  pvkPath: string
}
 */

export class EnvReadPersistenceConfig implements IPersistenceConfigLoader {
  constructor(
    private readonly validator: IValidator,
    private readonly envLoader: IEnvLoader
  ) {}

  load(): IOxTrustApiSettings {
    const configFromEnv = {
      host: this.envLoader.load('INBOUND_SAML_OXTRUST_API_HOST'),
      clientId: this.envLoader.load('INBOUND_SAML_OXTRUST_CLIENT_ID'),
      completePath: this.envLoader.load(
        'INBOUND_SAML_OXTRUST_API_COMPLETE_PATH'
      ),
      tokenUrl: this.envLoader.load('INBOUND_SAML_OXTRUST_API_TOKEN_URL'),
      kid: this.envLoader.load('INBOUND_SAML_OXTRUST_API_KID'),
      pvkPath: this.envLoader.load('INBOUND_SAML_OXTRUST_API_PVK_PATH')
    }
    this.validator.isValid(configFromEnv)
    return configFromEnv as IOxTrustApiSettings
  }
}
