import { InvalidRequestError } from '@sp-proxy/interface-adapters/delivery/errors/InvalidRequestError'
import { CreateRemoteIdpValidator } from '@sp-proxy/interface-adapters/delivery/validators/CreateRemoteIdpValidator'

describe('CreateRemoteIdpValidator', () => {
  it('should throw InvalidRequestError if no name key', async () => {
    const sut = new CreateRemoteIdpValidator()
    const invalidRequest = {
      body: {
        singleSignOnService: ['valid ssoService'],
        signingCertificates: ['valid cert 1', 'valid cert 2']
      }
    }
    await expect(sut.isValid(invalidRequest as any)).rejects.toThrow(
      new InvalidRequestError('Missing param: name.')
    )
  })
  it('should throw InvalidRequestError if no singleSignOnService', async () => {
    const sut = new CreateRemoteIdpValidator()
    const invalidRequest = {
      body: {
        name: 'valid name',
        signingCertificates: ['valid cert 1', 'valid cert 2']
      }
    }
    await expect(sut.isValid(invalidRequest as any)).rejects.toThrow(
      new InvalidRequestError('Missing param: singleSignOnService.')
    )
  })
  it('should throw InvalidRequestError if no signingCertificates', async () => {
    const sut = new CreateRemoteIdpValidator()
    const invalidRequest = {
      body: {
        name: 'valid name',
        singleSignOnService: ['valid ssoService']
      }
    }
    await expect(sut.isValid(invalidRequest as any)).rejects.toThrow(
      new InvalidRequestError('Missing param: signingCertificates.')
    )
  })
})
