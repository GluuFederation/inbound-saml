import { errorHandler } from '@sp-proxy/frameworks-drivers/main/utils/errorHandler'
import { AddTrFromMetadataFacade } from '@sp-proxy/interface-adapters/api/AddTrFromMetadataFacade'
import { makeAddTrFromMetadataComposite } from '@sp-proxy/interface-adapters/api/factories/makeAddTrFromMetadataComposite'
import { json, NextFunction, Request, Response, Router } from 'express'
import { MongoClient } from 'mongodb'
import { EventEmitter } from 'stream'
import cfg from '@sp-proxy/interface-adapters/config/env'
import serverConfig from '@sp-proxy/frameworks-drivers/main/config/env'

const addTrFromMetadataRouter = Router()
addTrFromMetadataRouter.use(json())
const basicPostAuth = () => {
  return (request: Request, response: Response, next: NextFunction) => {
    const encoded = request.headers.authorization?.replace('Basic ', '')
    if (encoded != null) {
      const string = Buffer.from(encoded?.toString(), 'base64').toString()
      const array = string.split(':')
      const username = array[0]
      // const password = array[1]
      if (username !== serverConfig.adminUser) {
        response.sendStatus(401)
        response.end()
      } else {
        next()
      }
    }
  }
}
const adaptFacade = () => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const eventBus = new EventEmitter()
    const client = new MongoClient(cfg.database.mongo.uri)
    const connection = await client.connect()
    try {
      const controller = makeAddTrFromMetadataComposite(eventBus, connection)
      const facade = new AddTrFromMetadataFacade(controller, eventBus)
      await facade.addTrFromMetadata({
        name: request.body.name,
        url: request.body.url
      })
      // TODO: return created object or link to, according to HTTP specs
      response.status(201).send({ creation: 'success' })
    } catch (err) {
      errorHandler(response, err)
    } finally {
      await connection.close()
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-misused-promises
addTrFromMetadataRouter.post('/metadata', basicPostAuth(), adaptFacade())

export default addTrFromMetadataRouter
