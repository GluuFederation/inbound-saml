import cfg from '@sp-proxy/frameworks-drivers/main/config/env'
import { createLogger, format, transports } from 'winston'

const fileTransport = new transports.File({
  filename: './log/inbound_saml.log'
})

export const defaultLogger = createLogger({
  exitOnError: false,
  level: cfg.logLevel,
  transports: [new transports.Console(), fileTransport],
  format: format.combine(
    format.splat(),
    format.padLevels(),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss.SSSZZ'
    }),
    format.printf(
      (info) =>
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `${info.timestamp} [${info.level.toUpperCase()}] ${info.message}`
    )
  )
})
