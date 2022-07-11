import cfg from '@sp-proxy/frameworks-drivers/main/config/env'
import { createLogger, format, transports } from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
import { FileTransportInstance } from 'winston/lib/winston/transports'

const makeFileTransport = (): FileTransportInstance => {
  return new transports.File({
    filename: './log/inbound_saml.log',
    options: { flags: 'w' }
  })
}

let fileTransport = makeFileTransport()

const dailyRotateLogOptions: DailyRotateFile.DailyRotateFileTransportOptions = {
  filename: './log/inbound_saml-%DATE%.log',
  handleExceptions: true,
  datePattern: 'YYYY-MM-DD',
  maxSize: '20m'
}

const dailyTransport: DailyRotateFile = new DailyRotateFile(
  dailyRotateLogOptions
)

export const defaultLogger = createLogger({
  exitOnError: false,
  level: cfg.logLevel,
  transports: [new transports.Console(), fileTransport, dailyTransport],
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

dailyTransport.on('rotate', () => {
  defaultLogger.remove(fileTransport)
  fileTransport = makeFileTransport()
  defaultLogger.add(fileTransport)
})
