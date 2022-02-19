// UMA realm="Authorization required", host_id=apitest.techno24x7.com, as_uri=https://apitest.techno24x7.com/.well-known/uma2-configuration, ticket=025f0c08-3701-4630-b075-9e276154d12d

import { IUmaHeaderParser } from '../protocols/IUmaHeaderParser'
import { UmaHeaderParser } from './UmaHeaderParser'

// receives `WWW-Authenticate header
// split string by comma
// find each value in array
// split by "=" and fetch value
// return object with parsed keys values

const makeSut = (): IUmaHeaderParser => {
  return new UmaHeaderParser()
}

describe('UmaHeaderParser', () => {
  describe('parse', () => {
    it('should call split with comma separator', () => {
      const splitSpy = jest.spyOn(String.prototype, 'split')
      const sut = makeSut()
      sut.parse('any value')
      expect(splitSpy).toHaveBeenCalled()
      expect(splitSpy).toHaveBeenCalledWith(', ')
    })
  })
})
