import { InvalidRequestError } from '@sp-proxy/interface-adapters/delivery/errors/InvalidRequestError'
import { Response } from 'express'

// different from default express error handler due async and testing
export const errorHandler = (response: Response, err: any): void => {
  if (err instanceof InvalidRequestError) {
    response.status(400).send((err as Error).message)
  } else if (err instanceof Error) {
    response.sendStatus(500)
  } else {
    response.sendStatus(500)
  }
}
