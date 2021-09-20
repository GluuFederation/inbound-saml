import addTrFromMetadataRouter from '@sp-proxy/frameworks-drivers/main/routes/addTrFromMetadataRouter'
import authenticateRouter from '@sp-proxy/frameworks-drivers/main/routes/authenticateRouter'
import metadataRouter from '@sp-proxy/frameworks-drivers/main/routes/metadataRouter'

import { Router } from 'express'
// import authenticateCallbackRouter from './authenticateCallbackRouter'

const spRoutes = Router()
spRoutes.use('/metadata', metadataRouter)
spRoutes.use(authenticateRouter)
// spRoutes.use(authenticateCallbackRouter)

const trRoutes = Router()
trRoutes.use('/trust-relation', addTrFromMetadataRouter)

const routes = Router()
routes.use('/inbound-saml/sp', spRoutes)
routes.use('/inbound-saml', trRoutes)

export default routes
