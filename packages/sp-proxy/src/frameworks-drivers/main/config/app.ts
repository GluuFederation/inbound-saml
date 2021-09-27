import routes from '@sp-proxy/frameworks-drivers/main/routes'
import express from 'express'
import { morganMiddleware } from './morganMiddleware'

const app = express()
app.use(morganMiddleware)
app.use(routes)
app.use(express.urlencoded({ extended: false }))

export default app
