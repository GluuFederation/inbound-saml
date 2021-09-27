import { adminBasicPostAuth } from '@sp-proxy/frameworks-drivers/main/middleware/adminBasicPostAuth'
import { AddTrFromMetadataFacade } from '@sp-proxy/interface-adapters/api/AddTrFromMetadataFacade'
import { makeAddTrFromMetadataComposite } from '@sp-proxy/interface-adapters/api/factories/makeAddTrFromMetadataComposite'
import { json, NextFunction, Request, Response, Router } from 'express'
import { MongoClient } from 'mongodb'
import { EventEmitter } from 'stream'
import cfg from '@sp-proxy/interface-adapters/config/env'
import { makeLogControllerDecorator } from '@sp-proxy/interface-adapters/delivery/factories/makeLogControllerDecorator'
import { WinstonLogger } from '@sp-proxy/frameworks-drivers/main/logger/WinstonLogger'
import { ExpressErrorHandler } from '@sp-proxy/frameworks-drivers/main/utils/ExpressErrorHandler'

const handler = ExpressErrorHandler.getInstance()

const addTrFromMetadataRouter = Router()
addTrFromMetadataRouter.use(json())

const adaptFacade = () => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const eventBus = new EventEmitter()
    const client = new MongoClient(cfg.database.mongo.uri)
    const connection = await client.connect()
    try {
      const controller = makeLogControllerDecorator(
        WinstonLogger.getInstance(),
        makeAddTrFromMetadataComposite(eventBus, connection)
      )
      const facade = new AddTrFromMetadataFacade(controller, eventBus)
      await facade.addTrFromMetadata({
        name: request.body.name,
        url: request.body.url
      })
      // TODO: return created object or link to, according to HTTP specs
      response.status(201).send({ creation: 'success' })
    } catch (err) {
      handler.handle(response, err)
    } finally {
      await connection.close()
    }
  }
}

addTrFromMetadataRouter.post('/metadata', adminBasicPostAuth(), adaptFacade())

export default addTrFromMetadataRouter
