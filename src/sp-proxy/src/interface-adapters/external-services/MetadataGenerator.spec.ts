import { MetadataGenerator } from '@sp-proxy/interface-adapters/external-services/MetadataGenerator'
import { IMetadataGeneratorParams } from '@sp-proxy/use-cases/ports/IMetadataGenerator'
import * as passportSaml from 'passport-saml'
jest.mock('passport-saml')

// receive receive configuration props needed to setup strategy
// create strategy
// generate metadata
// return generated metadata

const fakeRequestParams: IMetadataGeneratorParams = {
  callbackUrl: 'valid callback url',
  requestedIdentifierFormat: 'valid reqyestedIdentifierFormat',
  authnContextIdentifierFormat: 'valid authnContextIdentifierFormat',
  skipRequestCompression: false,
  decryption: {
    publicCert: 'decryption formatted public cert',
    privateKey: 'decryption formatted private key'
  },
  signing: {
    publicCert: 'signing formatted public cert',
    privateKey: 'signing formatted private key'
  }
}

describe('MetadataGeneratorSpec', () => {
  it('should strategy once with correct options', async () => {
    const strategySpy = jest.spyOn(passportSaml, 'Strategy')
    const sut = new MetadataGenerator()
    const strategyConfig: passportSaml.SamlConfig = {
      callbackUrl: fakeRequestParams.callbackUrl,
      identifierFormat: fakeRequestParams.requestedIdentifierFormat,
      authnContext: [fakeRequestParams.authnContextIdentifierFormat],
      skipRequestCompression: fakeRequestParams.skipRequestCompression,
      cert: expect.any(String),
      decryptionPvk: fakeRequestParams.decryption.privateKey
    }
    await sut.generate(fakeRequestParams)
    expect(strategySpy).toHaveBeenCalledTimes(1)
    expect(strategySpy).toHaveBeenCalledWith(
      strategyConfig,
      expect.any(Function)
    )
  })
  it('should call generateServiceProviderMetadata w/ decryption cert', async () => {
    const newParams = Object.assign({}, fakeRequestParams)
    delete newParams.signing
    const generateSpy = jest.spyOn(
      passportSaml.Strategy.prototype,
      'generateServiceProviderMetadata'
    )
    const sut = new MetadataGenerator()
    await sut.generate(newParams)
    expect(generateSpy).toHaveBeenCalledTimes(1)
    expect(generateSpy).toHaveBeenCalledWith(
      fakeRequestParams.decryption.publicCert,
      undefined
    )
  })
  it('should call generateServiceProviderMetadata w/ decryption and signing cert', async () => {
    const generateSpy = jest.spyOn(
      passportSaml.Strategy.prototype,
      'generateServiceProviderMetadata'
    )
    const sut = new MetadataGenerator()
    await sut.generate(fakeRequestParams)
    expect(generateSpy).toHaveBeenCalledTimes(1)
    expect(generateSpy).toHaveBeenCalledWith(
      fakeRequestParams.decryption.publicCert,
      fakeRequestParams.signing?.publicCert
    )
  })
  it('should return value returned by passport-saml generator', async () => {
    jest
      .spyOn(passportSaml.Strategy.prototype, 'generateServiceProviderMetadata')
      .mockReturnValueOnce('valid mocked generated metadata')
    const sut = new MetadataGenerator()
    expect(await sut.generate(fakeRequestParams)).toEqual(
      'valid mocked generated metadata'
    )
  })
  it('should throw if strategy creation throws', async () => {
    jest.spyOn(passportSaml, 'Strategy').mockImplementationOnce(() => {
      throw new Error()
    })
    const sut = new MetadataGenerator()
    await expect(sut.generate(fakeRequestParams)).rejects.toThrow()
  })
  it('should throw if generateServiceProviderMetadata throws', async () => {
    jest
      .spyOn(passportSaml.Strategy.prototype, 'generateServiceProviderMetadata')
      .mockImplementationOnce(() => {
        throw new Error()
      })
    const sut = new MetadataGenerator()
    await expect(sut.generate(fakeRequestParams)).rejects.toThrow()
  })
})
