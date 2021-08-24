/* eslint-disable @typescript-eslint/no-misused-promises */
import { makeGenerateMetadataFacade } from '@sp-proxy/frameworks-drivers/main/factories/makeGenerateMetadataFacade'
import { InvalidRequestError } from '@sp-proxy/interface-adapters/delivery/errors/InvalidRequestError'
import { Request, Response, Router } from 'express'

const metadataRouter = Router()

const adaptFacade = () => {
  return async (request: Request, response: Response) => {
    try {
      const facade = makeGenerateMetadataFacade()
      await facade.generateMetadata()
      response.sendStatus(200)
    } catch (err) {
      console.log('entered catch')
      if (err instanceof InvalidRequestError) {
        response.sendStatus(400)
      }
    }
  }
}

metadataRouter.get('/', adaptFacade())

export default metadataRouter
