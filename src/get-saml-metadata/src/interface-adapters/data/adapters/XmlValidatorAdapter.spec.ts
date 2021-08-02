import * as parser from 'fast-xml-parser'
import { XmlMetadata, XmlMetadataProps } from '../../../entities/value-objects/XmlMetadata'
import { IValidator } from '../../../use-cases/ports/IValidator'
import { XmlValidatorAdapter } from './XmlValidatorAdapter'

const validXmlString = '<root>Any valid xml</root>'

const fakeXmlProps: XmlMetadataProps = {
  xml: validXmlString
}

const makeFakeValidator = (): IValidator => {
  class FakeXmlValidator implements IValidator {
    isValid (data: XmlMetadata): boolean {
      return true
    }
  }
  return new FakeXmlValidator()
}

const fakeXmlMetadata = (xmlValidatorStub: IValidator): XmlMetadata => {
  const xmlValidator = xmlValidatorStub
  const fakeXmlMetadata = new XmlMetadata(xmlValidator, fakeXmlProps)
  return fakeXmlMetadata
}

jest.mock('fast-xml-parser')

describe('XmlValidatorAdapter', () => {
  it('should call xml validate with correct value', () => {
    const validateSpy = jest.spyOn(parser, 'validate')
    const sut = new XmlValidatorAdapter()
    const fakeXmlValidator = makeFakeValidator()

    // call isValid with a different XmlValidator, to avoid redundance
    sut.isValid(fakeXmlMetadata(fakeXmlValidator))
    expect(validateSpy).toHaveBeenCalledTimes(1)
    expect(validateSpy).toHaveBeenCalledWith(validXmlString)
  })
  it('should return false if validate returns ValidationError', () => {
    interface ValidationError {
      err: { code: string, msg: string, line: number }
    }
    /**
     * @implements private ValidationError
     */
    const validationError: ValidationError = {
      err: {
        code: 'code1',
        msg: 'error message',
        line: 9
      }
    }
    jest.spyOn(parser, 'validate').mockReturnValueOnce(validationError)
    const sut = new XmlValidatorAdapter()
    const fakeXmlValidator = makeFakeValidator()

    // call isValid with a different XmlValidator, to avoid redundance
    expect(sut.isValid(fakeXmlMetadata(fakeXmlValidator))).toBeFalsy()
  })
  it('should return true if validate returns true', () => {
    jest.spyOn(parser, 'validate').mockReturnValueOnce(true)
    const sut = new XmlValidatorAdapter()
    const fakeXmlValidator = makeFakeValidator()
    expect(sut.isValid(fakeXmlMetadata(fakeXmlValidator))).toBeTruthy()
  })
})