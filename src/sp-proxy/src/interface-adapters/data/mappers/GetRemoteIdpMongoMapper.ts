import { RemoteIdp } from '@sp-proxy/entities/RemoteIdp'
import { IDataMapper } from '@sp-proxy/interface-adapters/protocols/IDataMapper'

export class GetRemoteIdpMongoMapper implements IDataMapper<any, RemoteIdp> {
  async map(document: any): Promise<RemoteIdp> {
    const remoteIdpId = document.remoteIdp._id
    // TODO: construct singleSignOnService value object accordingly
    const remoteIdpProps = document.remoteIdp.props
    return new RemoteIdp(remoteIdpProps, remoteIdpId)
  }
}
