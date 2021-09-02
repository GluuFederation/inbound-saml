import { logError } from '@sp-proxy/frameworks-drivers/main/decorators/logError'
import { InvalidRequestError } from '@sp-proxy/interface-adapters/delivery/errors/InvalidRequestError'
import { Response } from 'express'

interface IExpressErrorHandler {
  handle: (response: Response, err: any) => void
}

export class ExpressErrorHandler implements IExpressErrorHandler {
  private static instance: ExpressErrorHandler
  private constructor() {}
  public static getInstance(): ExpressErrorHandler {
    if (ExpressErrorHandler.instance == null) {
      ExpressErrorHandler.instance = new ExpressErrorHandler()
    }
    return ExpressErrorHandler.instance
  }

  @logError()
  handle(response: Response, err: any): void {
    if (err instanceof InvalidRequestError) {
      response.status(400).send((err as Error).message)
    } else if (err instanceof Error) {
      response.sendStatus(500)
    } else {
      response.sendStatus(500)
    }
  }
}

// different from default express error handler due async and testing
// export const errorHandler = (response: Response, err: any): void => {
//   if (err instanceof InvalidRequestError) {
//     response.status(400).send((err as Error).message)
//   } else if (err instanceof Error) {
//     response.sendStatus(500)
//   } else {
//     response.sendStatus(500)
//   }
// }

// class ErrorHandler {
//   constructor(private readonly response: Response) {}

//   @logError()
//   handle(err: any): void {
//     errorHandler(this.response, err)
//   }
// }
