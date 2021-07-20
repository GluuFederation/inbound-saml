import { readFileSync } from 'fs'
import { InvalidPathOrUrlError } from './errors/InvalidPathOrUrlError'
import { IXmlMetadataLoadService } from './services/protocols/IXmlMetadataLoadService'
import { IdpMetadataProps, IdpMetadata } from './IdpMetadata'
import { BaseFileValidator } from './protocols/BaseFileValidator'
import { IXmlMetadataLoaderRepository } from './utils/IXmlMetadataLoaderRepository'
import { XmlMetadata } from './value-objects/XmlMetadata'
import { makeXmlMetadata } from './factories/makeXmlMetadata'

const validFilePath = process.cwd() + '/src/testdata/shibIdpMetadata.xml'
const validMetadataString = readFileSync(validFilePath).toString()
const validXmlMetadataProps = {
  xml: validMetadataString
}

const makeFileValidator = (returnValue: boolean): BaseFileValidator => {
  class FileValidatorStub extends BaseFileValidator {
    isValid (filepath: string): boolean {
      return returnValue
    }
  }
  return new FileValidatorStub()
}

const makeLoader = (): IXmlMetadataLoaderRepository => {
  class RepositoryImpl implements IXmlMetadataLoaderRepository {
    load (urlOrPath: string): XmlMetadata {
      const xml = 'valid xml'
      return makeXmlMetadata({ xml })
    }
  }
  return new RepositoryImpl()
}

const makeMetadataLoadService = (): IXmlMetadataLoadService => {
  const loader = makeLoader()
  class MetadataLoadServiceStub implements IXmlMetadataLoadService {
    readonly urlOrPath
    readonly loader
    constructor (
      urlOrPath: string,
      loader: IXmlMetadataLoaderRepository
    ) {
      this.urlOrPath = urlOrPath
      this.loader = loader
    }

    load (): XmlMetadata {
      return makeXmlMetadata(validXmlMetadataProps)
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
  metadataLoadServiceStub: IXmlMetadataLoadService
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

  it('props.data should contain XmlMetadata', () => {
    const { sut } = makeSut(true)
    expect(sut.props.data).toEqual(makeXmlMetadata(validXmlMetadataProps))
  })
})
