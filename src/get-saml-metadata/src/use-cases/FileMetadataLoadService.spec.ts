import { XmlMetadata, XmlMetadataProps } from "../entities/value-objects/XmlMetadata"
import { IValidator } from "./ports/IValidator"
import { IXmlMetadataLoaderRepository } from "./ports/IXmlMetadataLoaderRepository"
import { XmlMetadataLoadService } from "./XmlMetadataLoadService"

const fakeXmlProps: XmlMetadataProps = {
  xml: 'valid Xml String'
}
const makeXmlValidator = (): IValidator => {
  class XmlValidatorStub implements IValidator {
    isValid (data: XmlMetadata): boolean {
      return true
    }
  }
  return new XmlValidatorStub()
}

const makeFileLoader = (): IXmlMetadataLoaderRepository => {
  class FileLoaderStub implements IXmlMetadataLoaderRepository {
    public load (): XmlMetadata {
      return new XmlMetadata(makeXmlValidator(), fakeXmlProps)
    }
  }
  return new FileLoaderStub()
}

describe('XmlMetadataLoadService', () => {
  it('should call loader.load with correct values', () => {
    const validPath = '/valid/path'
    const fileLoader = makeFileLoader()
    const loaderLoadSpy = jest.spyOn(fileLoader, 'load')
    const sut = new XmlMetadataLoadService(
      validPath, fileLoader
    )
    sut.load()
    expect(loaderLoadSpy).toBeCalledWith(validPath)
  })
})
