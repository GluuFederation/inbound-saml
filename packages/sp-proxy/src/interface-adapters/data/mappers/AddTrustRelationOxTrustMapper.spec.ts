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
  it('should map multiple SingleSignOnServices correctly', async () => {
    const validSsoPropsArray: SingleSignOnServiceProps[] = [
      {
        binding: 'valid sso binding 1',
        location: 'valid sso location 1'
      },
      {
        binding: 'valid sso binding 2',
        location: 'valid sso location 2'
      },
      {
        binding: 'valid sso binding 3',
        location: 'valid sso location 3'
      }
    ]
    const sut = new AddTrustRelationOxTrustMapper()
    const remoteIdpProps: IRemoteIdpProps = {
      name: 'remote idp name',
      host: 'remote idp host',
      supportedSingleSignOnServices: [
        makeSingleSignOnService(validSsoPropsArray[0]),
        makeSingleSignOnService(validSsoPropsArray[1]),
        makeSingleSignOnService(validSsoPropsArray[2])
      ],
      signingCertificates: ['valid certificates']
    }
    const trustRelationProps: ITrustRelationProps = {
      remoteIdp: new RemoteIdp(remoteIdpProps),
      singleSignOnService: makeSingleSignOnService(validSsoPropsArray[0])
    }
    const trustRelationEntity = new TrustRelation(trustRelationProps)
    const dataModel = await sut.map(trustRelationEntity)
    const expectedDataModel: TrustRelationDataModel = {
      remoteIdp: {
        name: trustRelationEntity.props.remoteIdp.props.name,
        host: trustRelationEntity.props.remoteIdp.props.host, // trustRelationEntity.props.remoteIdp.props.host,
        supportedSingleSignOnServices: [
          trustRelationEntity.props.remoteIdp.props
            .supportedSingleSignOnServices[0].props,
          trustRelationEntity.props.remoteIdp.props
            .supportedSingleSignOnServices[1].props,
          trustRelationEntity.props.remoteIdp.props
            .supportedSingleSignOnServices[2].props
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
})
