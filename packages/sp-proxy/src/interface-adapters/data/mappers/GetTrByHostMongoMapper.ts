import { makeRemoteIdp } from '@sp-proxy/entities/factories/makeRemoteIdp'
import { makeSingleSignOnService } from '@sp-proxy/entities/factories/makeSingleSignOnService'
import { IRemoteIdpProps } from '@sp-proxy/entities/IRemoteIdp'
import { ITrustRelationProps } from '@sp-proxy/entities/protocols/ITrustRelationProps'
import { TrustRelation } from '@sp-proxy/entities/TrustRelation'
import { IDataMapper } from '@sp-proxy/interface-adapters/protocols/IDataMapper'
import { makeSingleSignOnServices } from '@sp-proxy/use-cases/factories/makeSingleSignOnServices'
import { IService } from '@sp-proxy/use-cases/protocols/IService'
import { Document as MongoDocument } from 'mongodb'

export class GetTrByHostMongoMapper
  implements IDataMapper<MongoDocument, TrustRelation>
{
  getCollectionSsoServices = (document: MongoDocument): IService[] => {
    const ssoServices: IService[] = []
    for (const ssoService of document.trustRelation.props.remoteIdp.props
      .supportedSingleSignOnServices) {
      ssoServices.push(ssoService.props)
    }
    return ssoServices
  }

  async map(document: MongoDocument): Promise<TrustRelation> {
    const remoteIdpProps: IRemoteIdpProps = {
      name: document.trustRelation.props.remoteIdp.props.name,
      host: document.trustRelation.props.remoteIdp.props.host,
      supportedSingleSignOnServices: makeSingleSignOnServices(
        this.getCollectionSsoServices(document)
      ),
      signingCertificates:
        document.trustRelation.props.remoteIdp.props.signingCertificates
    }
    const trProps: ITrustRelationProps = {
      remoteIdp: makeRemoteIdp(
        remoteIdpProps,
        document.trustRelation.props.remoteIdp._id
      ),
      singleSignOnService: makeSingleSignOnService(
        document.trustRelation.props.singleSignOnService.props
      )
    }
    return new TrustRelation(trProps, document.trustRelation._id)
  }
}
