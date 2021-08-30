import serverConfig from '@sp-proxy/frameworks-drivers/main/config/env'
import { NextFunction, Request, Response } from 'express'

/**
 * Validates POST credentials again admin credentials
 * @returns middleware function
 */
export const adminBasicPostAuth = () => {
  return (request: Request, response: Response, next: NextFunction) => {
    const encoded = request.headers.authorization?.replace('Basic ', '')
    if (encoded != null) {
      const string = Buffer.from(encoded?.toString(), 'base64').toString()
      const array = string.split(':')
      const username = array[0]
      if (username !== serverConfig.adminUser) {
        response.sendStatus(401)
        response.end()
      } else {
        next()
      }
    }
  }
}
