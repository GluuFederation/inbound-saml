// load environment variables for Persistence Settings

import { EnvReadPersistenceConfig } from './EnvReadPersistenceConfig'
import { EnvLoader } from './helpers/EnvLoader'
import { IEnvLoader } from './protocols/IEnvLoader'
import { IOxTrustApiSettings } from './protocols/IOxTrustApiSettings'
import { IValidator } from './protocols/IValidator'
import { NotNullOrUndefinedValidator } from './validators/NotNullOrUndefinedValidator'
import { OxTrustApiSettingsValidator } from './validators/OxTrustApiSettingsValidator'

const makeNullOrUndefinedValidator = (): IValidator => {
  return new NotNullOrUndefinedValidator()
}

const makeValidator = (nullOrUndefinedValidator: IValidator): IValidator => {
  return new OxTrustApiSettingsValidator(nullOrUndefinedValidator)
}

const makeEnvLoader = (): IEnvLoader => {
  return new EnvLoader()
}

interface SutTypes {
  sut: EnvReadPersistenceConfig
  nullOrUndefinedValidator: IValidator
  validator: IValidator
  envLoader: IEnvLoader
}

const makeSut = (): SutTypes => {
  const envLoader = makeEnvLoader()
  const nullOrUndefinedValidator = makeNullOrUndefinedValidator()
  const validator = makeValidator(nullOrUndefinedValidator)
  const sut = new EnvReadPersistenceConfig(validator, envLoader)
  return { sut, nullOrUndefinedValidator, validator, envLoader }
}

describe('EnvReadPersistenceConfig', () => {
  beforeEach(() => {
    process.env.INBOUND_SAML_OXTRUST_API_HOST = 'fake api host'
    process.env.INBOUND_SAML_OXTRUST_CLIENT_ID = 'fake api client id'
    process.env.INBOUND_SAML_OXTRUST_API_COMPLETE_PATH =
      'fake api complete path'
    process.env.INBOUND_SAML_OXTRUST_API_TOKEN_URL = 'fake complete token url'
    process.env.INBOUND_SAML_OXTRUST_API_KID = 'fake api kid'
    process.env.INBOUND_SAML_OXTRUST_API_PVK_PATH = 'fake api pvk path'
  })
  afterEach(() => {
    delete process.env.INBOUND_SAML_OXTRUST_CLIENT_ID
    delete process.env.INBOUND_SAML_OXTRUST_API_HOST
    delete process.env.INBOUND_SAML_OXTRUST_API_COMPLETE_PATH
    delete process.env.INBOUND_SAML_OXTRUST_API_TOKEN_URL
    delete process.env.INBOUND_SAML_OXTRUST_API_KID
    delete process.env.INBOUND_SAML_OXTRUST_API_PVK_PATH
  })
  it('should get values from process.env', () => {
    const { sut } = makeSut()
    const expectedResult: IOxTrustApiSettings = {
      host: 'fake api host',
      clientId: 'fake api client id',
      completePath: 'fake api complete path',
      tokenUrl: 'fake complete token url',
      kid: 'fake api kid',
      pvkPath: 'fake api pvk path'
    }
    expect(sut.load()).toEqual(expectedResult)
  })
  it('should throw if required env missing', () => {
    delete process.env.INBOUND_SAML_OXTRUST_API_TOKEN_URL // missing
    const { sut } = makeSut()
    expect(() => sut.load()).toThrow()
  })
})
