import { UmaHeaderError } from '../errors/UmaHeaderError'
import { IUmaHeaderParser } from '../protocols/IUmaHeaderParser'
import { UmaHeaderParser } from './UmaHeaderParser'

const makesut = (): IUmaHeaderParser => {
  return new UmaHeaderParser()
}

describe('UMAHeaderParser', () => {
  describe('parse', () => {
    it('should throw if no UMA realm header key found', () => {
      const invalidHeader =
        'host_id=apitest.techno24x7.com, as_uri=https://apitest.techno24x7.com/.well-known/uma2-configuration, ticket=e72ae32f-ad6d-458d-bf18-d34cd5081fb3'
      const sut = makesut()
      expect(() => {
        sut.parse(invalidHeader)
      }).toThrowError(UmaHeaderError)
    })
    it('should throw if no host_id in header', () => {
      const invalidHeader =
        'UMA realm="Authorization required", as_uri=https://apitest.techno24x7.com/.well-known/uma2-configuration, ticket=e72ae32f-ad6d-458d-bf18-d34cd5081fb3'
      const sut = makesut()
      expect(() => {
        sut.parse(invalidHeader)
      }).toThrowError(UmaHeaderError)
    })
    it('should throw if no as_uri in header', () => {
      const invalidHeader =
        'UMA realm="Authorization required", host_id=apitest.techno24x7.com, ticket=e72ae32f-ad6d-458d-bf18-d34cd5081fb3'
      const sut = makesut()
      expect(() => {
        sut.parse(invalidHeader)
      }).toThrowError(UmaHeaderError)
    })
    it('should throw if no ticket in header', () => {
      const invalidHeader =
        'UMA realm="Authorization required", host_id=apitest.techno24x7.com, as_uri=https://apitest.techno24x7.com/.well-known/uma2-configuration'
      const sut = makesut()
      expect(() => {
        sut.parse(invalidHeader)
      }).toThrowError(UmaHeaderError)
    })
  })
})
