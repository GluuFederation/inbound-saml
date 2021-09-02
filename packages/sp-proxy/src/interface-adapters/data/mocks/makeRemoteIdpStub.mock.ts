import { IRemoteIdpProps } from '@sp-proxy/entities/IRemoteIdp'
import { RemoteIdp } from '@sp-proxy/entities/RemoteIdp'
import { makeSingleSignOnServices } from '@sp-proxy/use-cases/factories/makeSingleSignOnServices'

const props: IRemoteIdpProps = {
  name: 'valid name',
  supportedSingleSignOnServices: makeSingleSignOnServices([
    { binding: 'valid binding', location: 'valid location' }
  ]),
  signingCertificates: ['cert1', 'cert2']
}

export const makeRemoteIdpStub = (): RemoteIdp => {
  return new RemoteIdp(props)
}
