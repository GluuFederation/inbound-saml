import { makeSingleSignOnService } from '@sp-proxy/entities/factories/makeSingleSignOnService'
import { IRemoteIdpProps } from '@sp-proxy/entities/IRemoteIdp'
import { ITrustRelationProps } from '@sp-proxy/entities/protocols/ITrustRelationProps'
import { RemoteIdp } from '@sp-proxy/entities/RemoteIdp'
import { TrustRelationDataModel } from '../models/TrustRelationDataModel'
import { GetTrByHostOxtrustMapper } from './GetTrByHostOxTrustMapper'

describe('GetTrByHostOxTrustMapper', () => {
  it('should return a valid Trust Relation entity', async () => {
    const sut = new GetTrByHostOxtrustMapper()
    const dataModel: TrustRelationDataModel = {
      remoteIdp: {
        name: 'valid remote idp name',
        host: 'valid host',
        supportedSingleSignOnServices: [
          { binding: 'valid binding1', location: 'valid location1' },
          { binding: 'valid binding2', location: 'valid location2' }
        ],
        signingCertificates: ['signing cert 1', 'signing cert 2'],
        id: 'valid remote idp id'
      },
      selectedSingleSignOnService: {
        binding: 'valid binding1',
        location: 'valid location1'
      }
    }

    const remoteIdpProps: IRemoteIdpProps = {
      name: dataModel.remoteIdp.name,
      host: dataModel.remoteIdp.host,
      supportedSingleSignOnServices: [
        makeSingleSignOnService(
          dataModel.remoteIdp.supportedSingleSignOnServices[0]
        ),
        makeSingleSignOnService(
          dataModel.remoteIdp.supportedSingleSignOnServices[1]
        )
      ],
      signingCertificates: dataModel.remoteIdp.signingCertificates
    }

    const remoteIdp = new RemoteIdp(remoteIdpProps, dataModel.remoteIdp.id)
    const trustRelationProps: ITrustRelationProps = {
      remoteIdp,
      singleSignOnService: makeSingleSignOnService(
        dataModel.selectedSingleSignOnService
      )
    }
    expect((await sut.map(dataModel)).props).toEqual(trustRelationProps)
  })
})
