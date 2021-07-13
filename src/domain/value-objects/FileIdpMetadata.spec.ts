// import { readFileSync } from 'fs'
// import { parseString } from 'xml2js'
import { FileIdpMetadata } from './FileIdpMetadata'
import { IIdpMetadata } from './protocols/BaseIdpMetadata'
import { IFileValidator } from './protocols/IFileValidator'

const validFilePath = process.cwd() + '/src/testdata/shibIdpMetadata.xml'

const makeFileValidator = (returnValue: boolean): IFileValidator => {
  class FileValidatorStub extends IFileValidator {
    isValid (filepath: string): boolean {
      return returnValue
    }
  }
  return new FileValidatorStub()
}

interface SutTypes {
  sut: FileIdpMetadata
  fileValidatorStub: IFileValidator
}

const makeSut = (validatorReturnValue: boolean): SutTypes => {
  const fakeIIdpMetadataProps: IIdpMetadata = {
    source: 'file',
    urlOrPath: validFilePath
  }
  const fileValidatorStub = makeFileValidator(validatorReturnValue)
  const sut = new FileIdpMetadata(fakeIIdpMetadataProps, fileValidatorStub)
  return {
    sut,
    fileValidatorStub
  }
}

describe('FileIdpMetadata', () => {
  it('should call load on new object construction/instance', () => {
    const loadSpy = jest.spyOn(FileIdpMetadata.prototype, 'load')
    makeSut(true)
    expect(loadSpy).toHaveBeenCalledTimes(1)
  })

  it('should throw if invalid file path', () => {
    // jest.spyOn(IFileValidator.prototype, 'isValid').mockReturnValueOnce(false)
    expect(() => {
      makeSut(false)
    }).toThrow()
  })
})
