/* eslint-disable @typescript-eslint/no-misused-promises */
import { makeGenerateMetadataFacade } from '@sp-proxy/frameworks-drivers/main/factories/makeGenerateMetadataFacade'
import { InvalidRequestError } from '@sp-proxy/interface-adapters/delivery/errors/InvalidRequestError'
import { Request, Response, Router } from 'express'

const metadataRouter = Router()

const adaptFacade = () => {
  return async (request: Request, response: Response) => {
    try {
      const facade = makeGenerateMetadataFacade()
      const xmlMetadata = await facade.generateMetadata()
      response.status(200).send(xmlMetadata)
    } catch (err) {
      if (err instanceof InvalidRequestError) {
        response.status(400).send(err.message)
      } else if (err instanceof Error) {
        response.sendStatus(500)
      } else if (!(err instanceof Error)) {
        console.log(err)
        response.sendStatus(500)
      }
    }
  }
}

metadataRouter.get('/', adaptFacade())

export default metadataRouter
