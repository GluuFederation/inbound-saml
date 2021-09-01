import { defaultLogger } from '@sp-proxy/frameworks-drivers/main/config/winston'
import { WinstonLogger } from '@sp-proxy/frameworks-drivers/main/logger/WinstonLogger'

describe('WinstonLogger', () => {
  describe('getInstance', () => {
    it('singleton should return the same instance', () => {
      const instanceOne = WinstonLogger.getInstance()
      const instanceTwo = WinstonLogger.getInstance()
      expect(instanceOne).toStrictEqual(instanceTwo)
    })
  })
  describe('debug', () => {
    it('should call winston debug with received param', () => {
      const sut = WinstonLogger.getInstance()
      const debugSpy = jest.spyOn(defaultLogger, 'debug')
      sut.debug('expected param')
      expect(debugSpy).toHaveBeenCalledTimes(1)
      expect(debugSpy).toHaveBeenCalledWith('expected param')
    })
  })
  describe('info', () => {})
  describe('warn', () => {})
  describe('error', () => {})
})
