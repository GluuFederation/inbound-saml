import { ICreateRemoteIdpRequest } from '@sp-proxy/interface-adapters/delivery/dtos/ICreateRemoteIdpRequest'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'

export const fakeCreateRemoteIdpRequest: IRequest<ICreateRemoteIdpRequest> = {
  id: 'valid request id',
  body: {
    name: 'valid name',
    singleSignOnService: [
      {
        binding: 'valid binding 1',
        location: 'valid location 1'
      },
      {
        binding: 'valid binding 2',
        location: 'valid location 2'
      }
    ],
    signingCertificates: ['valid cert 1', 'valid cert 2']
  }
}
