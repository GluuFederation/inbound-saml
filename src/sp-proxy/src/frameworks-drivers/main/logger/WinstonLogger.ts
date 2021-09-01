import { defaultLogger } from '@sp-proxy/frameworks-drivers/main/config/winston'
import { ILogger } from '@sp-proxy/interface-adapters/protocols/ILogger'

/**
 * Logger singleton adapter to Winston
 */
export class WinstonLogger implements ILogger {
  private static instance: WinstonLogger
  private constructor() {}
  private readonly winstonLogger = defaultLogger

  public static getInstance(): WinstonLogger {
    if (WinstonLogger.instance == null) {
      WinstonLogger.instance = new WinstonLogger()
    }
    return WinstonLogger.instance
  }

  debug(stack: string): void {
    this.winstonLogger.debug(stack)
  }

  info(stack: string): void {}
  warn(stack: string): void {}
  error(stack: string): void {}
}
