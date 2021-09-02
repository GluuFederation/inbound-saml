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
  describe('info', () => {
    it('should call winston info with received param', () => {
      const sut = WinstonLogger.getInstance()
      const infoSpy = jest.spyOn(defaultLogger, 'info')
      sut.info('expected param')
      expect(infoSpy).toHaveBeenCalledTimes(1)
      expect(infoSpy).toHaveBeenCalledWith('expected param')
    })
  })
  describe('warn', () => {
    it('should call winston warn with received param', () => {
      const sut = WinstonLogger.getInstance()
      const warnSpy = jest.spyOn(defaultLogger, 'warn')
      sut.warn('expected param')
      expect(warnSpy).toHaveBeenCalledTimes(1)
      expect(warnSpy).toHaveBeenCalledWith('expected param')
    })
  })
  describe('error', () => {
    it('should call winston error with received param', () => {
      const sut = WinstonLogger.getInstance()
      const errorSpy = jest.spyOn(defaultLogger, 'error')
      sut.error('expected param')
      expect(errorSpy).toHaveBeenCalledTimes(1)
      expect(errorSpy).toHaveBeenCalledWith('expected param')
    })
  })
})
