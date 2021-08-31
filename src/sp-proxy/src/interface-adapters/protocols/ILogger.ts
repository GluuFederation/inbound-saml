export interface ILogger {
  debug: (stack: string) => void
  info: (stack: string) => void
  warn: (stack: string) => void
  error: (stack: string) => void
}
