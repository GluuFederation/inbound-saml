import { makeSingleSignOnService } from '@sp-proxy/entities/factories/makeSingleSignOnService'
import { IRemoteIdpProps } from '@sp-proxy/entities/IRemoteIdp'
import { ITrustRelationProps } from '@sp-proxy/entities/protocols/ITrustRelationProps'
import { RemoteIdp } from '@sp-proxy/entities/RemoteIdp'
import { TrustRelation } from '@sp-proxy/entities/TrustRelation'
import { IDataMapper } from '@sp-proxy/interface-adapters/protocols/IDataMapper'
import { makeSingleSignOnServices } from '@sp-proxy/use-cases/factories/makeSingleSignOnServices'
import { TrustRelationDataModel } from '../models/TrustRelationDataModel'

export class GetTrByHostOxtrustMapper
  implements IDataMapper<TrustRelationDataModel, TrustRelation>
{
  async map(dataModel: TrustRelationDataModel): Promise<TrustRelation> {
    const remoteIdpProps: IRemoteIdpProps = {
      name: dataModel.remoteIdp.name,
      host: dataModel.remoteIdp.host,
      supportedSingleSignOnServices: makeSingleSignOnServices(
        dataModel.remoteIdp.supportedSingleSignOnServices
      ),
      signingCertificates: dataModel.remoteIdp.signingCertificates
    }
    const trustRelationProps: ITrustRelationProps = {
      remoteIdp: new RemoteIdp(remoteIdpProps, dataModel.remoteIdp.id),
      singleSignOnService: makeSingleSignOnService(
        dataModel.selectedSingleSignOnService
      )
    }
    return new TrustRelation(trustRelationProps)
  }
}
