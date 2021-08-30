import serverConfig from '@sp-proxy/frameworks-drivers/main/config/env'
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
      const string = Buffer.from(encoded?.toString(), 'base64').toString()
      const credentials = string.split(':')
      const username = credentials[0]
      const password = credentials[1]
      if (
        username === serverConfig.adminUser &&
        password === serverConfig.adminPassword
      ) {
        next()
      } else {
        response.sendStatus(401)
      }
    }
  }
}
