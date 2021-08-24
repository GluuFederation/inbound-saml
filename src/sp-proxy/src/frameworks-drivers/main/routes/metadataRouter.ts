/* eslint-disable @typescript-eslint/no-misused-promises */
import { makeGenerateMetadataFacade } from '@sp-proxy/frameworks-drivers/main/factories/makeGenerateMetadataFacade'
import { InvalidRequestError } from '@sp-proxy/interface-adapters/delivery/errors/InvalidRequestError'
import { Request, Response, Router } from 'express'

const metadataRouter = Router()

const adaptFacade = () => {
  return async (request: Request, response: Response) => {
    try {
      const facade = makeGenerateMetadataFacade()
      const metadataDto = await facade.generateMetadata()
      const metadata = metadataDto.metadata
      response
        .setHeader('content-type', 'application/xml')
        .status(200)
        .send(metadata)
    } catch (err) {
      if (err instanceof InvalidRequestError) {
        response.status(400).send(err.message)
      } else if (err instanceof Error) {
        response.sendStatus(500)
      } else {
        response.sendStatus(500)
      }
    }
  }
}

metadataRouter.get('/', adaptFacade())

export default metadataRouter
