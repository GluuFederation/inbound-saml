import { IValidator } from '../protocols/IValidator'
import { OxTrustApiSettingsValidator } from './OxTrustApiSettingsValidator'

interface SutTypes {
  nullOrUndefinedValidator: IValidator
  sut: IValidator
}

const makeNullOrUndefinedValidator = (): IValidator => {
  class NullOrUndefinedValidatorStub implements IValidator {
    isValid(value: any): boolean {
      return true
    }
  }
  return new NullOrUndefinedValidatorStub()
}

const makeSut = (): SutTypes => {
  const nullOrUndefinedValidator = makeNullOrUndefinedValidator()
  const sut = new OxTrustApiSettingsValidator(nullOrUndefinedValidator)
  return { nullOrUndefinedValidator, sut }
}

interface IValidSettingsFromEnv {
  host: any | undefined
  clientId: any | undefined
  completePath: any | undefined
  tokenUrl: any | undefined
  kid: any | undefined
  pvkPath: any | undefined
}

const validSettingsFromEnv: IValidSettingsFromEnv = {
  host: 'valid host',
  clientId: 'valid client Id',
  completePath: 'valid complete path',
  tokenUrl: 'valid token url',
  kid: 'valid kid',
  pvkPath: 'valid pvkPath'
}

describe('OxTrustApiSettingsValidator', () => {
  it('should throw if nullOrUndefinedValidator throws', () => {
    const { sut, nullOrUndefinedValidator } = makeSut()
    jest
      .spyOn(nullOrUndefinedValidator, 'isValid')
      .mockImplementationOnce(() => {
        throw new Error()
      })
    expect(() => sut.isValid(validSettingsFromEnv)).toThrow()
  })
})
