/* eslint-disable @typescript-eslint/no-misused-promises */
import { makeGenerateMetadataFacade } from '@sp-proxy/frameworks-drivers/main/factories/makeGenerateMetadataFacade'
import { errorHandler } from '@sp-proxy/frameworks-drivers/main/utils/errorHandler'
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
      errorHandler(response, err)
    }
  }
}

metadataRouter.get('/', adaptFacade())

export default metadataRouter
