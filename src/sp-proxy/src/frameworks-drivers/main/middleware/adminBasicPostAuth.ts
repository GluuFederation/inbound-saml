import serverConfig from '@sp-proxy/frameworks-drivers/main/config/env'
import { decodeCredentials } from '@sp-proxy/frameworks-drivers/main/helpers/decodeCredentials'
import { NextFunction, Request, Response } from 'express'

/**
 * Validates POST credentials again admin credentials
 * @returns middleware function
 */
export const adminBasicPostAuth = () => {
  return (request: Request, response: Response, next: NextFunction) => {
    const encoded = request.headers.authorization?.replace('Basic ', '')
    if (encoded == null) {
      response.sendStatus(401)
    } else {
      const credentials = decodeCredentials(encoded)
      if (
        credentials.user === serverConfig.adminUser &&
        credentials.password === serverConfig.adminPassword
      ) {
        next()
      } else {
        response.sendStatus(401)
      }
    }
  }
}
