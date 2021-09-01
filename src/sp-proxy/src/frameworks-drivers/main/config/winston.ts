import { createLogger, format, transports } from 'winston'
import cfg from '@sp-proxy/frameworks-drivers/main/config/env'

export const defaultLogger = createLogger({
  level: cfg.logLevel,
  transports: [new transports.Console()],
  format: format.simple()
})
