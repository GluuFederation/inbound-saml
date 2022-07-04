import { PersistenceError } from '../errors/PersistenceError'
import { StringParser } from './StringParser'

describe('StringParser', () => {
  describe('stringToInt', () => {
    it('should call parseInt with correct params', () => {
      const parseIntSpy = jest.spyOn(global, 'parseInt')
      const sut = new StringParser()
      sut.stringToInt('correctParam')
      expect(parseIntSpy).toHaveBeenCalledWith('correctParam', 10)
    })
    it('should return parsed value', () => {
      jest.spyOn(global, 'parseInt').mockReturnValue('parsedInt' as any)
      const sut = new StringParser()
      expect(sut.stringToInt('anyvalue')).toEqual('parsedInt')
    })
  })
  describe('stringToBool', () => {
    it('should throw PersistenceError', () => {
      const sut = new StringParser()
      expect(() => sut.stringToBool('notABoolean' as any)).toThrow(
        new PersistenceError('Error parsing string notABoolean to boolean')
      )
    })
  })
})
