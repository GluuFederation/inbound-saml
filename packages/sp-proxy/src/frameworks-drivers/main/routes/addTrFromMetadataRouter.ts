import { WinstonLogger } from '@sp-proxy/frameworks-drivers/main/logger/WinstonLogger'
import { adminBasicPostAuth } from '@sp-proxy/frameworks-drivers/main/middleware/adminBasicPostAuth'
import { ExpressErrorHandler } from '@sp-proxy/frameworks-drivers/main/utils/ExpressErrorHandler'
import { AddTrFromMetadataFacade } from '@sp-proxy/interface-adapters/api/AddTrFromMetadataFacade'
import { makeAddTrFromMetadataComposite } from '@sp-proxy/interface-adapters/api/factories/makeAddTrFromMetadataComposite'
import { makeLogControllerDecorator } from '@sp-proxy/interface-adapters/delivery/factories/makeLogControllerDecorator'
import { json, NextFunction, Request, Response, Router } from 'express'
import { EventEmitter } from 'stream'

const handler = ExpressErrorHandler.getInstance()

const addTrFromMetadataRouter = Router()
addTrFromMetadataRouter.use(json())

const adaptFacade = () => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const eventBus = new EventEmitter()
    try {
      const controller = makeLogControllerDecorator(
        WinstonLogger.getInstance(),
        makeAddTrFromMetadataComposite(eventBus)
      )
      const facade = new AddTrFromMetadataFacade(controller, eventBus)
      await facade.addTrFromMetadata({
        name: request.body.name,
        // TODO: Parse host from url
        host: request.body.host,
        url: request.body.url
      })
      // TODO: return created object or link to, according to HTTP specs
      response.status(201).send({ creation: 'success' })
    } catch (err) {
      handler.handle(response, err)
    }
  }
}

addTrFromMetadataRouter.post('/metadata', adminBasicPostAuth(), adaptFacade())

export default addTrFromMetadataRouter
