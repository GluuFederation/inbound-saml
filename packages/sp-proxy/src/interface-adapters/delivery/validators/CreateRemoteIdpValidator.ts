import { ICreateRemoteIdpRequest } from '@sp-proxy/interface-adapters/delivery/dtos/ICreateRemoteIdpRequest'
import { InvalidRequestError } from '@sp-proxy/interface-adapters/delivery/errors/InvalidRequestError'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
import { IValidator } from '@sp-proxy/interface-adapters/protocols/IValidator'

/**
 * Validates CreateRemoteIdp request received by controller
 */
export class CreateRemoteIdpValidator implements IValidator {
  async isValid(request: IRequest<ICreateRemoteIdpRequest>): Promise<boolean> {
    if (!('name' in request.body)) {
      throw new InvalidRequestError('Missing param: name.')
    } else if (!('singleSignOnService' in request.body)) {
      throw new InvalidRequestError('Missing param: singleSignOnService.')
    } else if (!('signingCertificates' in request.body)) {
      throw new InvalidRequestError('Missing param: signingCertificates.')
    } else if (!('host' in request.body)) {
      throw new InvalidRequestError('Missing param: host.')
    }
    return true
  }
}
