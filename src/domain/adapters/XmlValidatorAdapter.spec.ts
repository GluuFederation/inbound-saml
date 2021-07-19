import { readFileSync } from 'fs'
import xml2js from 'xml2js'
import { IValidator } from '../protocols/IValidator'
import { XmlMetadata, XmlMetadataProps } from '../value-objects/XmlMetadata'
import { XmlValidatorAdapter } from './XmlValidatorAdapter'

const validXmlFilePath = process.cwd() + '/src/testdata/shibIdpMetadata.xml'

// const validXmlString = readFileSync(validXmlFilePath).toString()

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

describe('XmlValidatorAdapter', () => {
  it('should call xml parser with correct value', () => {
    const parseStringSpy = jest.spyOn(xml2js, 'parseString')
    const sut = new XmlValidatorAdapter()
    const fakeXmlValidator = makeFakeValidator()

    // call isValid with a different XmlValidator, to avoid redundance
    sut.isValid(fakeXmlMetadata(fakeXmlValidator))

    expect(parseStringSpy).toHaveBeenCalledTimes(1)

    // assert first argument
    expect(parseStringSpy.mock.calls[0][0]).toEqual(validXmlString)
  })
})
