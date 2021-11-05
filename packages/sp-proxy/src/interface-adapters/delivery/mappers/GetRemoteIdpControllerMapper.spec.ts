import { GetByIdDTO } from '@sp-proxy/interface-adapters/delivery/dtos/GetByIdDTO'
import { GetRemoteIdpControllerMapper } from '@sp-proxy/interface-adapters/delivery/mappers/GetRemoteIdpControllerMapper'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'
import { GetRemoteIdpRequestUseCaseParams } from '@sp-proxy/use-cases/io-models/request/GetRemoteIdpRequestUseCaseParams'

describe('GetRemoteIdpControllerMapper', () => {
  it('should return expected request model', () => {
    const fakeRequest: IRequest<GetByIdDTO> = {
      id: 'request id',
      body: {
        id: 'entity id'
      }
    }
    const expectedResponse: IRequestModel<GetRemoteIdpRequestUseCaseParams> = {
      requestId: fakeRequest.id,
      request: fakeRequest.body
    }
    const sut = new GetRemoteIdpControllerMapper()
    expect(sut.map(fakeRequest)).toStrictEqual(expectedResponse)
  })
})
