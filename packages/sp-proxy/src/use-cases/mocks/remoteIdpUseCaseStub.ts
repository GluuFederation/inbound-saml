import { IRemoteIdpProps } from '@sp-proxy/entities/IRemoteIdp'
import { RemoteIdp } from '@sp-proxy/entities/RemoteIdp'
import { makeSingleSignOnServices } from '@sp-proxy/use-cases/factories/makeSingleSignOnServices'

const props: IRemoteIdpProps = {
  name: 'valid name',
  host: 'valid host',
  supportedSingleSignOnServices: makeSingleSignOnServices([
    { binding: 'valid binding', location: 'valid location' }
  ]),
  signingCertificates: ['cert1', 'cert2']
}

/**
 * Creates RemoteIdp entity to be used in **USE-CASE LAYER**
 * @param id if not provided will be auto-generated
 * @returns RemoteIdp entity stub
 */
export const makeRemoteIdpUseCaseStub = (id?: string): RemoteIdp => {
  return new RemoteIdp(props, id)
}
