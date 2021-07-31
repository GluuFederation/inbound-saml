import { IValidator } from '../../use-cases/ports/IValidator'
import { XmlMetadata, XmlMetadataProps } from './XmlMetadata'

const makeXmlValidator = (): IValidator => {
  class XmlValidatorStub implements IValidator {
    isValid (data: XmlMetadata): boolean {
      return true
    }
  }
  return new XmlValidatorStub()
}

const fakeXmlProps: XmlMetadataProps = {
  xml: 'valid xml'
}
const makeSut = (xmlValidatorStub: IValidator): XmlMetadata => {
  const xmlValidator = xmlValidatorStub
  const sut = new XmlMetadata(xmlValidator, fakeXmlProps)
  return sut
}

describe('XmlMetadata', () => {
  it('should call isValid with correct value', () => {
    const xmlValidatorStub = makeXmlValidator()
    const isValidSpy = jest.spyOn(xmlValidatorStub, 'isValid')
    const sut = makeSut(xmlValidatorStub)
    expect(isValidSpy).toBeCalledTimes(1)
    expect(isValidSpy).toBeCalledWith(sut)
  })
  it('should throw if validator throws', () => {
    const xmlValidatorStub = makeXmlValidator()
    jest.spyOn(xmlValidatorStub, 'isValid').mockImplementationOnce(
      () => { throw new Error() }
    )
    expect(() => {
      makeSut(xmlValidatorStub)
    }).toThrow()
  })
})
