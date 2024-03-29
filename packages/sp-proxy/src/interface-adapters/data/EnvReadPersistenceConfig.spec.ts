// load values from env
// validates values
// return IOxTrustApiSettings

import { EnvReadPersistenceConfig } from './EnvReadPersistenceConfig'
import { IEnvLoader } from './protocols/IEnvLoader'
import { IPersistenceConfigLoader } from './protocols/IPersistenceConfigLoader'
import { IValidator } from './protocols/IValidator'

const makeValidator = (): IValidator => {
  class ValidatorStub implements IValidator {
    isValid(loadedFromEnv: Record<string, any>): boolean {
      return true
    }
  }
  return new ValidatorStub()
}

const makeEnvLoader = (): IEnvLoader => {
  class EnvLoaderStub implements IEnvLoader {
    load(environmentVariable: string): string | undefined {
      return 'stub value loaded from env'
    }
  }
  return new EnvLoaderStub()
}

interface SutTypes {
  validatorStub: IValidator
  envLoaderStub: IEnvLoader
  sut: IPersistenceConfigLoader
}

const makeSut = (): SutTypes => {
  const validatorStub = makeValidator()
  const envLoaderStub = makeEnvLoader()
  const sut = new EnvReadPersistenceConfig(validatorStub, envLoaderStub)
  return { validatorStub, envLoaderStub, sut }
}

describe('EnvReadPersistenceConfig', () => {
  it('should call EnvLoader with correct values', () => {
    const { sut, envLoaderStub } = makeSut()
    const loadSpy = jest.spyOn(envLoaderStub, 'load')
    sut.load()
    expect(loadSpy).toHaveBeenCalledWith('INBOUND_SAML_OXTRUST_API_HOST')
    expect(loadSpy).toHaveBeenCalledWith('INBOUND_SAML_OXTRUST_CLIENT_ID')
    expect(loadSpy).toHaveBeenCalledWith(
      'INBOUND_SAML_OXTRUST_API_COMPLETE_PATH'
    )
    expect(loadSpy).toHaveBeenCalledWith('INBOUND_SAML_OXTRUST_API_TOKEN_URL')
    expect(loadSpy).toHaveBeenCalledWith('INBOUND_SAML_OXTRUST_API_KID')
    expect(loadSpy).toHaveBeenCalledWith('INBOUND_SAML_OXTRUST_API_PVK_PATH')
  })
  it('should call validator with correct keys', () => {
    const { sut, validatorStub } = makeSut()
    const isValidSpy = jest.spyOn(validatorStub, 'isValid')
    sut.load()
    expect(isValidSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        host: expect.anything(),
        clientId: expect.anything(),
        completePath: expect.anything(),
        tokenUrl: expect.anything(),
        kid: expect.anything(),
        pvkPath: expect.anything()
      })
    )
  })
  it('throw if validator throws', () => {
    const { sut, validatorStub } = makeSut()
    jest.spyOn(validatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    expect(() => sut.load()).toThrow()
  })
})
