import { makeSingleSignOnService } from '@sp-proxy/entities/factories/makeSingleSignOnService'
import { IRemoteIdpProps } from '@sp-proxy/entities/IRemoteIdp'
import { ITrustRelationProps } from '@sp-proxy/entities/protocols/ITrustRelationProps'
import { RemoteIdp } from '@sp-proxy/entities/RemoteIdp'
import { TrustRelation } from '@sp-proxy/entities/TrustRelation'
import { GetTRMongoMapper } from '@sp-proxy/interface-adapters/data/mappers/GetTRMongoMapper'
import { IService } from '@sp-proxy/interface-adapters/protocols/IService'
import { makeSingleSignOnServices } from '@sp-proxy/use-cases/factories/makeSingleSignOnServices'

const getCollectionSsoServices = (document: any): IService[] => {
  const ssoServices: IService[] = []
  for (const ssoService of document.trustRelation.props.remoteIdp.props
    .supportedSingleSignOnServices) {
    ssoServices.push(ssoService.props)
  }
  return ssoServices
}

describe('GetTRMongoMapper.spec.ts', () => {
  it('should map document to TrustRelation entity', async () => {
    const documentSample = {
      _id: '6126cfd2630b0dffea68f01c',
      trustRelation: {
        _id: '8a9f1194-0c41-42b3-8aa0-3355145e03ad',
        props: {
          remoteIdp: {
            _id: '94a88726-eae0-4651-b972-2d71adc73309',
            props: {
              name: 'valid name',
              supportedSingleSignOnServices: [
                {
                  props: {
                    binding: 'valid binding',
                    location: 'valid location'
                  },
                  validator: {}
                }
              ],
              signingCertificates: ['cert1', 'cert2']
            }
          },
          singleSignOnService: {
            props: {
              binding: 'any binding',
              location: 'https://valid.host/any-path'
            },
            validator: {}
          }
        }
      }
    }
    const sut = new GetTRMongoMapper()

    const expectedRemoteIdpProps: IRemoteIdpProps = {
      name: documentSample.trustRelation.props.remoteIdp.props.name,
      supportedSingleSignOnServices: makeSingleSignOnServices(
        getCollectionSsoServices(documentSample)
      ),
      signingCertificates:
        documentSample.trustRelation.props.remoteIdp.props.signingCertificates
    }
    const expectedTrProps: ITrustRelationProps = {
      remoteIdp: new RemoteIdp(
        expectedRemoteIdpProps,
        documentSample.trustRelation.props.remoteIdp._id
      ),
      singleSignOnService: makeSingleSignOnService(
        documentSample.trustRelation.props.singleSignOnService.props
      )
    }
    const expectedEntity = new TrustRelation(
      expectedTrProps,
      documentSample.trustRelation._id
    )

    const entity = await sut.map(documentSample)
    expect(entity.props.remoteIdp.props).toStrictEqual(expectedRemoteIdpProps)
    expect(entity.props).toStrictEqual(expectedTrProps)
    expect(entity.id).toEqual(expectedEntity.id)
    expect(entity.equals(expectedEntity)).toBeTruthy()
  })
})
