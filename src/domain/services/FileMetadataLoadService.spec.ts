import { IValidator } from '../protocols/IValidator'
import { IMetadataLoaderRepository } from '../utils/IMetadataLoaderRepository'
import { XmlMetadata, XmlMetadataProps } from '../value-objects/XmlMetadata'
import { FileMetadataLoadService } from './FileMetadataLoadService'

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

const makeFileLoader = (): IMetadataLoaderRepository => {
  class FileLoaderStub implements IMetadataLoaderRepository {
    public load (): XmlMetadata {
      return new XmlMetadata(makeXmlValidator(), fakeXmlProps)
    }
  }
  return new FileLoaderStub()
}

describe('FileMetadataLoadService', () => {
  it('should call loader.load with correct values', () => {
    const validPath = '/valid/path'
    const fileLoader = makeFileLoader()
    const loaderLoadSpy = jest.spyOn(fileLoader, 'load')
    const sut = new FileMetadataLoadService(
      validPath, fileLoader
    )
    sut.load()
    expect(loaderLoadSpy).toBeCalledWith(validPath)
  })
})
