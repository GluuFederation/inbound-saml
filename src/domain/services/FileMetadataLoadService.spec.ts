import { IMetadataLoaderRepository } from '../utils/IMetadataLoaderRepository'
import { FileMetadataLoadService } from './FileMetadataLoadService'

const makeFileLoader = (): IMetadataLoaderRepository => {
  class FileLoaderStub implements IMetadataLoaderRepository {
    public load (): string {
      return 'valid file string'
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
