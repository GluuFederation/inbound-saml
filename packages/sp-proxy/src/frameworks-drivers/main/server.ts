import routes from '@sp-proxy/frameworks-drivers/main/routes'
import express from 'express'
import { readFileSync } from 'fs'
import https from 'https'
import cfg from '@sp-proxy/frameworks-drivers/main/config/env'

const app = express()

app.use(routes)
app.use(express.urlencoded({ extended: false }))
const cert = readFileSync(cfg.tlsCertPath).toString()
const key = readFileSync(cfg.tlsKeyPath).toString()
const server = https.createServer({ key: key, cert: cert }, app)
server.listen(cfg.port, () => console.log('server started'))

export default app
