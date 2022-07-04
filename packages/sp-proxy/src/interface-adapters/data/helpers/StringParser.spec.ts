import { PersistenceError } from '../errors/PersistenceError'
import { BooleanStringType } from '../protocols/BooleanStringType'
import { StringParser } from './StringParser'

describe('StringParser', () => {
  describe('stringToInt', () => {
    it('should call parseInt with correct params', () => {
      const parseIntSpy = jest.spyOn(global, 'parseInt')
      const sut = new StringParser()
      sut.stringToInt('5000')
      expect(parseIntSpy).toHaveBeenCalledWith('5000', 10)
    })
    it('should return parsed value', () => {
      jest.spyOn(global, 'parseInt').mockReturnValue('parsedInt' as any)
      const sut = new StringParser()
      expect(sut.stringToInt('anyvalue')).toEqual('parsedInt')
    })
    it('should throw if parseInt returns NaN', () => {
      jest.spyOn(global, 'parseInt').mockReturnValue(NaN)
      const sut = new StringParser()
      expect(() => sut.stringToInt('not a number')).toThrow(
        new PersistenceError('Error parsing string not a number to integer')
      )
    })
  })
  describe('stringToBool', () => {
    it('should throw PersistenceError', () => {
      const sut = new StringParser()
      expect(() => sut.stringToBool('notABoolean' as any)).toThrow(
        new PersistenceError('Error parsing string notABoolean to boolean')
      )
    })
    it('should not throw if valid', () => {
      const validParams: BooleanStringType[] = [
        'TRUE',
        'true',
        'True',
        'FALSE',
        'false',
        'False'
      ]
      for (const validParam of validParams) {
        const sut = new StringParser()
        expect(() => sut.stringToBool(validParam)).not.toThrow(
          new PersistenceError(`Error parsing string ${validParam} to boolean`)
        )
      }
    })
    it('should return true', () => {
      // TRUE, true, True
      const sut = new StringParser()
      expect(sut.stringToBool('TRUE')).toBeTruthy()
      expect(sut.stringToBool('true')).toBeTruthy()
      expect(sut.stringToBool('True')).toBeTruthy()
    })
    it('should return false when false string values', () => {
      // FALSE, false, False
      const sut = new StringParser()
      expect(sut.stringToBool('FALSE')).toBeFalsy()
      expect(sut.stringToBool('false')).toBeFalsy()
      expect(sut.stringToBool('False')).toBeFalsy()
    })
  })
})
