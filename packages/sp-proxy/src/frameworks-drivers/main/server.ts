import { readFileSync } from 'fs'
import https from 'https'
import cfg from '@sp-proxy/frameworks-drivers/main/config/env'
import app from '@sp-proxy/frameworks-drivers/main/config/app'

const cert = readFileSync(cfg.tlsCertPath).toString()
const key = readFileSync(cfg.tlsKeyPath).toString()
const server = https.createServer({ key: key, cert: cert }, app)
server.listen(cfg.port, () => console.log('server started'))

export default app
