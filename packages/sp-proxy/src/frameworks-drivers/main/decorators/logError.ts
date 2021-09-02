import { WinstonLogger } from '@sp-proxy/frameworks-drivers/main/logger/WinstonLogger'

const logger = WinstonLogger.getInstance()

/**
 * Decorator to error handlers
 */
// export function logError(target: any): void {
//   console.log(target)
// }
export function logError() {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const targetMethod: Function = descriptor.value

    descriptor.value = function (...args: any[]) {
      for (const arg of args) {
        if (arg instanceof Error || typeof arg === 'string') {
          let message: string
          if (arg instanceof Error) {
            message = arg.message
          } else {
            message = arg
          }
          logger.error(message)
        }
      }
      return targetMethod.apply(this, args)
    }
  }
}
