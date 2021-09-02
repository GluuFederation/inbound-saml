import addTrFromMetadataRouter from '@sp-proxy/frameworks-drivers/main/routes/addTrFromMetadataRouter'
import metadataRouter from '@sp-proxy/frameworks-drivers/main/routes/metadataRouter'
import { Router } from 'express'

const spRoutes = Router()
spRoutes.use('/metadata', metadataRouter)

const trRoutes = Router()
trRoutes.use('/trust-relation', addTrFromMetadataRouter)

const routes = Router()
routes.use('/sp', spRoutes)
routes.use('/inbound-saml', trRoutes)

export default routes
