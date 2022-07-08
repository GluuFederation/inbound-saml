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
    this.envLoader.load('INBOUND_SAML_OXTRUST_API_HOST')
    this.envLoader.load('INBOUND_SAML_OXTRUST_CLIENT_ID')
    this.envLoader.load('INBOUND_SAML_OXTRUST_API_COMPLETE_PATH')
    this.envLoader.load('INBOUND_SAML_OXTRUST_API_TOKEN_URL')
    this.envLoader.load('INBOUND_SAML_OXTRUST_API_KID')
    this.envLoader.load('INBOUND_SAML_OXTRUST_API_PVK_PATH')
    // const settingsFromEnv = {
    //   host: INBOUND_SAML_OXTRUST_API_HOST,
    //   clientId: process.env.INBOUND_SAML_OXTRUST_CLIENT_ID,
    //   completePath: process.env.INBOUND_SAML_OXTRUST_API_COMPLETE_PATH,
    //   tokenUrl: process.env.INBOUND_SAML_OXTRUST_API_TOKEN_URL,
    //   kid: process.env.INBOUND_SAML_OXTRUST_API_KID,
    //   pvkPath: process.env.INBOUND_SAML_OXTRUST_API_PVK_PATH
    // }
    return 'settingsFromEnv' as unknown as IOxTrustApiSettings
  }
}
