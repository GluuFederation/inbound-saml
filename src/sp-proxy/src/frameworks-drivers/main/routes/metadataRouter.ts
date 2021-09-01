/* eslint-disable @typescript-eslint/no-misused-promises */
import { makeGenerateMetadataFacade } from '@sp-proxy/frameworks-drivers/main/factories/makeGenerateMetadataFacade'
import { ExpressErrorHandler } from '@sp-proxy/frameworks-drivers/main/utils/ExpressErrorHandler'
import { Request, Response, Router } from 'express'

const errorHandler = ExpressErrorHandler.getInstance()

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
      errorHandler.handle(response, err)
    }
  }
}

metadataRouter.get('/', adaptFacade())

export default metadataRouter
