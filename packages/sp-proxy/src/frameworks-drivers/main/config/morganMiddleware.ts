import morgan, { StreamOptions } from 'morgan'
import { WinstonLogger } from '@sp-proxy/frameworks-drivers/main/logger/WinstonLogger'

const logger = WinstonLogger.getInstance()

const stream: StreamOptions = {
  write: (message: any) => logger.debug(message)
}

/**
 * setup morgan to be used with winston logger stream
 */
export const morganMiddleware = morgan('combined', { stream: stream })
