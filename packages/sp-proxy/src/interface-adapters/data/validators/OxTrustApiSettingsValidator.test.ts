// receives inputs from string loaded from env
// 1. throws if required fields not there
// 2. throws if null or undefined

import { PersistenceError } from '../errors/PersistenceError'
import { IValidator } from '../protocols/IValidator'
import { NotNullOrUndefinedValidator } from './NotNullOrUndefinedValidator'
import { OxTrustApiSettingsValidator } from './OxTrustApiSettingsValidator'

// export interface IOxTrustApiSettings {
//   host: string
//   clientId: string
//   completePath: string
//   tokenUrl: string
//   kid: string
//   pvkPath: string
// }

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

// const requiredKeys = [
//   'host',
//   'clientId',
//   'completePath',
//   'tokenUrl',
//   'kid',
//   'pkvPath'
// ]

const makeNullOrUndefinedValidator = (): IValidator => {
  return new NotNullOrUndefinedValidator()
}

interface SutTypes {
  nullOrUndefinedValidator: IValidator
  sut: IValidator
}
const makeSut = (): SutTypes => {
  const nullOrUndefinedValidator = makeNullOrUndefinedValidator()
  const sut = new OxTrustApiSettingsValidator(nullOrUndefinedValidator)
  return {
    nullOrUndefinedValidator,
    sut
  }
}
describe('OxTrustApiSettingsValidator', () => {
  it('should throw if required fields are missing', () => {
    const mockedInvalidSettingsFromEnv = {
      host: 'valid host',
      clientId: 'valid client Id'
    }
    const { sut } = makeSut()
    expect(() => sut.isValid(mockedInvalidSettingsFromEnv)).toThrow(
      new PersistenceError(
        'Error validating OxTrustApiSettings loaded from env. Required key is missing.'
      )
    )
  })
  it('should call notNullOrUndefinedValidator', () => {
    const { sut, nullOrUndefinedValidator } = makeSut()
    const isValidSpy = jest.spyOn(nullOrUndefinedValidator, 'isValid')
    sut.isValid(validSettingsFromEnv)
    expect(isValidSpy).toHaveBeenCalledTimes(6)
  })
  it('should throw if one or more undefined values', () => {
    const { sut } = makeSut()
    const invalidSettings = Object.assign({}, validSettingsFromEnv)
    invalidSettings.tokenUrl = undefined
    expect(() => sut.isValid(invalidSettings)).toThrow()
  })
  it('should return true if valid', () => {
    const { sut } = makeSut()
    expect(sut.isValid(validSettingsFromEnv)).toBeTruthy()
  })
})
