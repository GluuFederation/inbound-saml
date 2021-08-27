import { errorHandler } from '@sp-proxy/frameworks-drivers/main/utils/errorHandler'
import { AddTrFromMetadataFacade } from '@sp-proxy/interface-adapters/api/AddTrFromMetadataFacade'
import { makeAddTrFromMetadataComposite } from '@sp-proxy/interface-adapters/api/factories/makeAddTrFromMetadataComposite'
import { json, NextFunction, Request, Response, Router } from 'express'
import { EventEmitter } from 'stream'

const addTrFromMetadataRouter = Router()

addTrFromMetadataRouter.use(json())

const adaptFacade = () => {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      const eventBus = new EventEmitter()
      const controller = makeAddTrFromMetadataComposite(eventBus)
      const facade = new AddTrFromMetadataFacade(controller, eventBus)
      await facade.addTrFromMetadata({
        name: request.body.name,
        url: request.body.url
      })
      response.sendStatus(201)
    } catch (err) {
      errorHandler(response, err)
    }
  }
}
// eslint-disable-next-line @typescript-eslint/no-misused-promises
addTrFromMetadataRouter.post('/metadata', adaptFacade())

export default addTrFromMetadataRouter
