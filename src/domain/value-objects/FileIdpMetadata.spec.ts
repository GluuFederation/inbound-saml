// import { readFileSync } from 'fs'
// import { parseString } from 'xml2js'
import { readFileSync } from 'fs'
import { InvalidPathOrUrlError } from '../errors/InvalidPathOrUrlError'
import { makeFileLoaderAdapter } from '../factories/makeFileLoaderAdapter'
import { IMetadataLoadService } from '../services/protocols/IMetadataLoadService'
import { FileIdpMetadata } from './FileIdpMetadata'
import { IIdpMetadata } from './protocols/BaseIdpMetadata'
import { BaseFileValidator } from '../protocols/BaseFileValidator'
import { IMetadataLoader } from './protocols/IMetadataLoader'

const validFilePath = process.cwd() + '/src/testdata/shibIdpMetadata.xml'
const validMetadataString = readFileSync(validFilePath).toString()

const makeFileValidator = (returnValue: boolean): BaseFileValidator => {
  class FileValidatorStub extends BaseFileValidator {
    isValid (filepath: string): boolean {
      return returnValue
    }
  }
  return new FileValidatorStub()
}

const makeMetadataLoadService = (): IMetadataLoadService => {
  const fileLoaderAdapter = makeFileLoaderAdapter()
  class MetadataLoadServiceStub implements IMetadataLoadService {
    readonly urlOrPath
    readonly loader
    constructor (
      urlOrPath: string,
      loader: IMetadataLoader
    ) {
      this.urlOrPath = urlOrPath
      this.loader = loader
    }

    load (): string {
      return validMetadataString
    }
  }
  return new MetadataLoadServiceStub(
    validFilePath,
    fileLoaderAdapter
  )
}

interface SutTypes {
  sut: FileIdpMetadata
  fileValidatorStub: BaseFileValidator
  metadataLoadServiceStub: IMetadataLoadService
}

const makeSut = (validatorReturnValue: boolean): SutTypes => {
  const fakeIIdpMetadataProps: IIdpMetadata = {
    source: 'file',
    urlOrPath: validFilePath
  }
  const fileValidatorStub = makeFileValidator(validatorReturnValue)
  const metadataLoadServiceStub = makeMetadataLoadService()
  const sut = new FileIdpMetadata(
    fakeIIdpMetadataProps, fileValidatorStub, metadataLoadServiceStub)
  return {
    sut,
    fileValidatorStub,
    metadataLoadServiceStub
  }
}

describe('FileIdpMetadata', () => {
  it('should call load on new object construction/instance', () => {
    const loadSpy = jest.spyOn(FileIdpMetadata.prototype, 'load')
    makeSut(true)
    expect(loadSpy).toHaveBeenCalledTimes(1)
  })

  it('should throw if invalid file path', () => {
    expect(() => {
      makeSut(false)
    }).toThrow()
  })

  it('should throw InvalidPathOrUrlError if invalid file path', () => {
    expect(() => {
      makeSut(false)
    }).toThrow(InvalidPathOrUrlError)
  })
})
