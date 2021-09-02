import routes from '@sp-proxy/frameworks-drivers/main/routes'
import express from 'express'

const app = express()

app.use(routes)
app.use(express.urlencoded({ extended: false }))
app.listen(5000, () => console.log('server started'))

export default app
