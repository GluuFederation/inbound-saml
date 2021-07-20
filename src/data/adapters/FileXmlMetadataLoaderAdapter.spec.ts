import fs from 'fs'
import { makeXmlMetadata } from '../../domain/factories/makeXmlMetadata'
import { FileXmlMetadataLoaderAdapter } from './FileXmlMetadataLoaderAdapter'

const validFilePath = process.cwd() + '/src/testdata/shibIdpMetadata.xml'
const validMetadataString = fs.readFileSync(validFilePath).toString()
const validXmlMetadata = makeXmlMetadata({ xml: validMetadataString })

describe('FileXmlMetadataLoaderAdapter', () => {
  it('should call readFileSync with correct values', () => {
    const readFileSyncSpy = jest.spyOn(fs, 'readFileSync')
    const sut = new FileXmlMetadataLoaderAdapter()
    sut.load(validFilePath)
    expect(readFileSyncSpy).toHaveBeenCalledWith(validFilePath)
    expect(readFileSyncSpy).toHaveBeenCalledTimes(1)
  })

  it('should return valid Metadata string', () => {
    const sut = new FileXmlMetadataLoaderAdapter()
    expect(sut.load(validFilePath)).toEqual(validXmlMetadata)
  })

  it('should throw if fs throws', () => {
    const sut = new FileXmlMetadataLoaderAdapter()
    const throwError = (): never => {
      throw new Error()
    }
    jest.spyOn(fs, 'readFileSync').mockImplementationOnce(throwError)
    expect(() => {
      sut.load(validFilePath)
    }).toThrow(Error)
  })
})
