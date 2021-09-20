export default {
  adminUser: process.env.ADMIN_USER ?? 'admin',
  adminPassword: process.env.ADMIN_PWD ?? 'admin',
  logLevel: process.env.LOG_LEVEL ?? 'debug',
  port: process.env.PORT ?? '5000',
  tlsCertPath:
    process.env.TLS_CERT_PATH ??
    `${process.cwd()}/packages/sp-proxy/src/frameworks-drivers/main/cert/cert.pem`,
  tlsKeyPath:
    process.env.TLS_KEY_PATH ??
    `${process.cwd()}/packages/sp-proxy/src/frameworks-drivers/main/cert/key.pem`
}
