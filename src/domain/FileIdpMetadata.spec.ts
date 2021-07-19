// import { readFileSync } from 'fs'
// import { parseString } from 'xml2js'
import { readFileSync } from 'fs'
import { InvalidPathOrUrlError } from './errors/InvalidPathOrUrlError'
// import { makeFileLoaderAdapter } from '../application/factories/makeFileLoaderAdapter'
import { IMetadataLoadService } from './services/protocols/IMetadataLoadService'
import { IdpMetadataProps, IdpMetadata } from './IdpMetadata'
import { BaseFileValidator } from './protocols/BaseFileValidator'
import { IMetadataLoaderRepository } from './utils/IMetadataLoaderRepository'
import { FileLoaderAdapter } from '../data/adapters/FileLoaderAdapter'

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

const makeLoader = (): IMetadataLoaderRepository => {
  class RepositoryImpl implements IMetadataLoaderRepository {
    load (urlOrPath: string): string {
      return validMetadataString
    }
  }
  return new RepositoryImpl()
}


const makeMetadataLoadService = (): IMetadataLoadService => {
  const loader = makeLoader()
  class MetadataLoadServiceStub implements IMetadataLoadService {
    readonly urlOrPath
    readonly loader
    constructor (
      urlOrPath: string,
      loader: IMetadataLoaderRepository
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
    loader
  )
}

interface SutTypes {
  sut: IdpMetadata
  fileValidatorStub: BaseFileValidator
  metadataLoadServiceStub: IMetadataLoadService
}

const makeSut = (validatorReturnValue: boolean): SutTypes => {
  const fakeIdpMetadataPropsProps: IdpMetadataProps = {
    source: 'file',
    urlOrPath: validFilePath
  }
  const fileValidatorStub = makeFileValidator(validatorReturnValue)
  const metadataLoadServiceStub = makeMetadataLoadService()
  const sut = new IdpMetadata(
    fakeIdpMetadataPropsProps, fileValidatorStub, metadataLoadServiceStub)
  return {
    sut,
    fileValidatorStub,
    metadataLoadServiceStub
  }
}

describe('IdpMetadata', () => {
  it('should call load on new object construction/instance', () => {
    const loadSpy = jest.spyOn(IdpMetadata.prototype, 'load')
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

  it('props.data should contain Metadata', () => {
    const { sut } = makeSut(true)
    expect(sut.props.data).toEqual(validMetadataString)
  })
})
