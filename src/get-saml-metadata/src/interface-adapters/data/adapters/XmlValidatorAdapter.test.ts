import { IValidator } from '@get-saml-metadata/entities/ports/IValidator'
import {
  XmlMetadata,
  XmlMetadataProps
} from '@get-saml-metadata/entities/value-objects/XmlMetadata'
import { XmlValidatorAdapter } from '@get-saml-metadata/interface-adapters/data/adapters/XmlValidatorAdapter'
import { InvalidXmlError } from '@get-saml-metadata/interface-adapters/data/errors/InvalidXmlError'
import { readFileSync } from 'fs'

const validXmlFilePath = process.cwd() + '/src/testdata/shibIdpMetadata.xml'

const validXmlString = readFileSync(validXmlFilePath).toString()

const fakeXmlProps: XmlMetadataProps = {
  xml: validXmlString
}

const makeFakeValidator = (): IValidator => {
  class FakeXmlValidator implements IValidator {
    isValid(data: XmlMetadata): boolean {
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
  it('should return true if valid XML is sent as param', () => {
    const xmlMetadata = fakeXmlMetadata(makeFakeValidator())
    const sut = new XmlValidatorAdapter()
    expect(sut.isValid(xmlMetadata)).toBeTruthy()
  })
  it('should throw if invalid XML is sent as param', () => {
    const invalidXmlProps = {
      xml: '<root> invalid >root'
    }
    const invalidXmlMetadata = (xmlValidatorStub: IValidator): XmlMetadata => {
      const xmlValidator = xmlValidatorStub
      const fakeXmlMetadata = new XmlMetadata(xmlValidator, invalidXmlProps)
      return fakeXmlMetadata
    }
    const xmlMetadata = invalidXmlMetadata(makeFakeValidator())
    const sut = new XmlValidatorAdapter()
    expect(() => {
      sut.isValid(xmlMetadata)
    }).toThrow()
  })
  it('should throw InvalidXmlError if invalid XML is sent as param', () => {
    const invalidXmlProps = {
      xml: '<root> invalid >root'
    }
    const invalidXmlMetadata = (xmlValidatorStub: IValidator): XmlMetadata => {
      const xmlValidator = xmlValidatorStub
      const fakeXmlMetadata = new XmlMetadata(xmlValidator, invalidXmlProps)
      return fakeXmlMetadata
    }
    const xmlMetadata = invalidXmlMetadata(makeFakeValidator())
    const sut = new XmlValidatorAdapter()
    expect(() => {
      sut.isValid(xmlMetadata)
    }).toThrow(InvalidXmlError)
  })
})
