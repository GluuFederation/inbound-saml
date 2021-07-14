import fs from 'fs'
import { FileLoaderAdapter } from './FileLoaderAdapter'

const validFilePath = process.cwd() + '/src/testdata/shibIdpMetadata.xml'
const validMetadataString = fs.readFileSync(validFilePath).toString()

describe('FileLoaderAdapter', () => {
  it('should call readFileSync with correct values', () => {
    const readFileSyncSpy = jest.spyOn(fs, 'readFileSync')
    const sut = new FileLoaderAdapter()
    sut.load(validFilePath)
    expect(readFileSyncSpy).toHaveBeenCalledWith(validFilePath)
    expect(readFileSyncSpy).toHaveBeenCalledTimes(1)
  })

  it('should return valid Metadata string', () => {
    const sut = new FileLoaderAdapter()
    expect(sut.load(validFilePath)).toEqual(validMetadataString)
  })

  it('should throw if fs throws', () => {
    const sut = new FileLoaderAdapter()
    const throwError = (): never => {
      throw new Error()
    }
    jest.spyOn(fs, 'readFileSync').mockImplementationOnce(throwError)
    expect(() => {
      sut.load(validFilePath)
    }).toThrow(Error)
  })
})
