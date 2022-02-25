import { makeSingleSignOnService } from '@sp-proxy/entities/factories/makeSingleSignOnService'
import { IRemoteIdpProps } from '@sp-proxy/entities/IRemoteIdp'
import { ITrustRelationProps } from '@sp-proxy/entities/protocols/ITrustRelationProps'
import { RemoteIdp } from '@sp-proxy/entities/RemoteIdp'
import { TrustRelation } from '@sp-proxy/entities/TrustRelation'
import {
  SingleSignOnService,
  SingleSignOnServiceProps
} from '@sp-proxy/entities/value-objects/SingleSignOnServices'
import { TrustRelationDataModel } from '../models/TrustRelationDataModel'
import { AddTrustRelationOxTrustMapper } from './AddTrustRelationOxTrustMapper'

describe('AddTrustRelationOxTrustMapper', () => {
  it('should map entity to data model', async () => {
    const sut = new AddTrustRelationOxTrustMapper()
    const validSsoProps: SingleSignOnServiceProps = {
      binding: 'valid sso binding',
      location: 'valid sso location'
    }
    const singleSignOnService = makeSingleSignOnService(validSsoProps)
    const singleSignOnServices: SingleSignOnService[] = [singleSignOnService]
    const remoteIdpProps: IRemoteIdpProps = {
      name: 'remote idp name',
      host: 'remote idp host',
      supportedSingleSignOnServices: singleSignOnServices,
      signingCertificates: ['valid certificates']
    }
    const trustRelationProps: ITrustRelationProps = {
      remoteIdp: new RemoteIdp(remoteIdpProps),
      singleSignOnService: singleSignOnService
    }
    const trustRelationEntity = new TrustRelation(trustRelationProps)
    const dataModel = await sut.map(trustRelationEntity)
    const expectedDataModel: TrustRelationDataModel = {
      remoteIdp: {
        name: trustRelationEntity.props.remoteIdp.props.name,
        host: trustRelationEntity.props.remoteIdp.props.host, // trustRelationEntity.props.remoteIdp.props.host,
        supportedSingleSignOnServices: [
          trustRelationEntity.props.remoteIdp.props
            .supportedSingleSignOnServices[0].props
        ],
        signingCertificates:
          trustRelationEntity.props.remoteIdp.props.signingCertificates,
        id: trustRelationEntity.id
      },
      selectedSingleSignOnService:
        trustRelationEntity.props.singleSignOnService.props
    }
    expect(dataModel).toEqual(expectedDataModel)
  })
  // TODO: test for multiple SSO Services (array)
})
