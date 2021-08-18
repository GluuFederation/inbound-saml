import { GetRemoteIdpPresenterMapper } from '@sp-proxy/interface-adapters/delivery/mappers/GetRemoteIdpPresenterMapper'
import { IResponse } from '@sp-proxy/interface-adapters/protocols/IResponse'
import { RemoteIdpDeliveryProps } from '@sp-proxy/interface-adapters/protocols/RemoteIdpDeliveryProps'
import { IResponseModel } from '@sp-proxy/use-cases/io-models/IResponseModel'
import { RemoteIdpUseCaseParams } from '@sp-proxy/use-cases/io-models/RemoteIdpUseCaseParams'

describe('GetRemoteIdpPresenterMapper', () => {
  it('should return mapped response dto', () => {
    const sut = new GetRemoteIdpPresenterMapper()
    const fakeResponseModel: IResponseModel<RemoteIdpUseCaseParams> = {
      requestId: 'valid request id',
      response: {
        id: 'valid entity id',
        name: 'valid name',
        singleSignOnService: [
          {
            binding: 'valid binding',
            location: 'valid location'
          }
        ],
        signingCertificates: ['valid cert']
      }
    }
    const expectedMappedDto: IResponse<RemoteIdpDeliveryProps> = {
      requestId: fakeResponseModel.requestId,
      body: fakeResponseModel.response
    }
    expect(sut.map(fakeResponseModel)).toStrictEqual(expectedMappedDto)
  })
})
