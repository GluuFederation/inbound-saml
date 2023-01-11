import cfg from '@sp-proxy/frameworks-drivers/main/config/env'
import routes from '@sp-proxy/frameworks-drivers/main/routes'
import express from 'express'
import { readFileSync } from 'fs'
import http from 'http'
import https from 'https'
import { WinstonLogger } from './logger/WinstonLogger'

const app = express()
const logger = WinstonLogger.getInstance()
app.use(routes)
app.use(express.urlencoded({ extended: false }))
if (!cfg.useTls) {
  const server = http.createServer(app)
  server.listen(cfg.port, () => {
    logger.info('Inbound Saml SP Proxy Started in non TLS mode')
  })
} else {
  const cert = readFileSync(cfg.tlsCertPath).toString()
  const key = readFileSync(cfg.tlsKeyPath).toString()
  const server = https.createServer({ key, cert }, app)
  server.listen(cfg.port, () => {
    logger.info('Inbound Saml SP Proxy Started in TLS mode')
  })
}

export default app
