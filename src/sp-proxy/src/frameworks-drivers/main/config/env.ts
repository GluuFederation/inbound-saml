export default {
  adminUser: process.env.ADMIN_USER ?? 'admin',
  adminPassword: process.env.ADMIN_PWD ?? 'admin',
  logLevel: process.env.LOG_LEVEL ?? 'debug'
}
