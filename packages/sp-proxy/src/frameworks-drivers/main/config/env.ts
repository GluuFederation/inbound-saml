export default {
  adminUser: process.env.INBOUND_SAML_ADMIN_USER ?? 'admin',
  adminPassword: process.env.INBOUND_SAML_ADMIN_PWD ?? 'admin',
  logLevel: process.env.INBOUND_SAML_LOG_LEVEL ?? 'debug',
  port: process.env.INBOUND_SAML_PORT ?? '5000',
  useTls: process.env.INBOUND_SAML_USE_TLS ?? false,
  tlsCertPath:
    process.env.INBOUND_SAML_TLS_CERT_PATH ??
    `${process.cwd()}/packages/sp-proxy/src/frameworks-drivers/main/cert/cert.pem`,
  tlsKeyPath:
    process.env.INBOUND_SAML_TLS_KEY_PATH ??
    `${process.cwd()}/packages/sp-proxy/src/frameworks-drivers/main/cert/key.pem`
}
