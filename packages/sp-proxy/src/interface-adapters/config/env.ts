import { makeApiSettingsFromEnvLoader } from '../data/factories/makeApiSettingsFromEnvLoader'
import { IOxTrustApiSettings } from '../data/protocols/IOxTrustApiSettings'

const getConfigFilePath = (): any => {
  if (process.env.NODE_ENV === 'test') {
    return (
      process.cwd() +
      '/packages/sp-proxy/src/frameworks-drivers/file-persistence/sp-proxy-config-test.json'
    )
  } else if (process.env.NODE_ENV === 'dev') {
    return (
      process.cwd() +
      '/packages/sp-proxy/src/frameworks-drivers/file-persistence/sp-proxy-config-dev.json'
    )
  }
}

const oxTrustApiSettingsFromEnvLoader = makeApiSettingsFromEnvLoader()

const developmentOxTrustApiSettings: IOxTrustApiSettings = {
  host: process.env.INBOUND_SAML_OXTRUST_API_HOST ?? 'localhost',
  clientId: process.env.INBOUND_SAML_OXTRUST_CLIENT_ID ?? 'valid client id',
  completePath:
    process.env.INBOUND_SAML_OXTRUST_API_COMPLETE_PATH ??
    'identity/restv1/api/v1/inbound-saml',
  tokenUrl:
    process.env.INBOUND_SAML_OXTRUST_API_TOKEN_URL ??
    `https://localhost/oxauth/restv1/token`,
  kid: process.env.INBOUND_SAML_OXTRUST_API_KID ?? 'valid pvk',
  pvkPath:
    process.env.INBOUND_SAML_OXTRUST_API_PVK_PATH ??
    'packages/testdata/rs256pvk.pem'
}

const oxTrustApiSettings: IOxTrustApiSettings =
  process.env.NODE_ENV === 'production'
    ? oxTrustApiSettingsFromEnvLoader.load()
    : developmentOxTrustApiSettings

export default {
  oxTrustApi: oxTrustApiSettings,
  database: {
    file: {
      proxyConfigPath:
        process.env.INBOUND_SAML_PROXY_CFG_PATH ?? getConfigFilePath()
    }
  }
}
