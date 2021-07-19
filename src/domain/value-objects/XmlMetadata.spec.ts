import { IValidator } from '../protocols/IValidator'
import { XmlMetadata } from './IXmlMetadata'

const makeXmlValidator = (): IValidator => {
  class XmlValidatorStub implements IValidator {
    isValid (data: XmlMetadata): boolean {
      return true
    }
  }
  return new XmlValidatorStub()
}

describe('XmlMetadata', () => {
  it('should call isValid with correct value', () => {
    const xmlValidatorStub = makeXmlValidator()
    const isValidSpy = jest.spyOn(xmlValidatorStub, 'isValid')
    const sut = new XmlMetadata(xmlValidatorStub, { xml: 'valid xml' })
    expect(isValidSpy).toBeCalledTimes(1)
    expect(isValidSpy).toBeCalledWith(sut)
  })
})
