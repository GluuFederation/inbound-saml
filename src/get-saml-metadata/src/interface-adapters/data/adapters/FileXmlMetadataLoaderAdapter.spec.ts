import { FileXmlMetadataLoaderAdapter } from '@get-saml-metadata/interface-adapters/data/adapters/FileXmlMetadataLoaderAdapter'
import fs from 'fs'
import { validFilePath, validXmlMetadata } from '../../../../../testdata/fakes'

describe('FileXmlMetadataLoaderAdapter', () => {
  it('should call readFileSync with correct values', async () => {
    const readFileSyncSpy = jest.spyOn(fs, 'readFileSync')
    const sut = new FileXmlMetadataLoaderAdapter()
    await sut.load(validFilePath)
    expect(readFileSyncSpy).toHaveBeenCalledWith(validFilePath)
    expect(readFileSyncSpy).toHaveBeenCalledTimes(1)
  })

  it('should return valid Metadata string', async () => {
    const sut = new FileXmlMetadataLoaderAdapter()
    expect(await sut.load(validFilePath)).toEqual(validXmlMetadata)
  })

  it('should throw if fs throws', async () => {
    const sut = new FileXmlMetadataLoaderAdapter()
    const throwError = (): never => {
      throw new Error()
    }
    jest.spyOn(fs, 'readFileSync').mockImplementationOnce(throwError)
    await expect(sut.load(validFilePath)).rejects.toThrow(Error)
  })
})
