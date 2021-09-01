import { createLogger, format, transports } from 'winston'

export const defaultLogger = createLogger({
  transports: [new transports.Console()],
  format: format.simple()
})
