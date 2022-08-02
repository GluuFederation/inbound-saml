import { StringParser } from '../helpers/StringParser'
import { BooleanStringType } from '../protocols/BooleanStringType'

const stringParser = new StringParser()

const portString = process.env.INBOUND_SAML_PORT ?? '5000'
const useTlsString = process.env.INBOUND_SAML_USE_TLS ?? 'false'

export default {
  adminUser: process.env.INBOUND_SAML_ADMIN_USER ?? 'admin',
  adminPassword: process.env.INBOUND_SAML_ADMIN_PWD ?? 'admin',
  logLevel: process.env.INBOUND_SAML_LOG_LEVEL ?? 'debug',
  port: stringParser.stringToInt(portString),
  useTls: stringParser.stringToBool(useTlsString as BooleanStringType),
  tlsCertPath:
    process.env.INBOUND_SAML_TLS_CERT_PATH ??
    `${process.cwd()}/packages/sp-proxy/src/frameworks-drivers/main/cert/cert.pem`,
  tlsKeyPath:
    process.env.INBOUND_SAML_TLS_KEY_PATH ??
    `${process.cwd()}/packages/sp-proxy/src/frameworks-drivers/main/cert/key.pem`
}
