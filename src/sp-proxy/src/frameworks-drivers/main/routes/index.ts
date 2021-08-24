import metadataRouter from '@sp-proxy/frameworks-drivers/main/routes/metadataRouter'
import { Router } from 'express'

const spRoutes = Router()
spRoutes.use('/metadata', metadataRouter)

const routes = Router()
routes.use('/sp', spRoutes)

export default routes
