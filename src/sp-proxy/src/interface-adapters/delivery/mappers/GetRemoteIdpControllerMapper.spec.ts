import { GetRemoteIdpControllerMapper } from '@sp-proxy/interface-adapters/delivery/mappers/GetRemoteIdpControllerMapper'
import { GetByIdDTO } from '@sp-proxy/interface-adapters/protocols/GetByIdDTO'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
import { GetRemoteIdpRequestModel } from '@sp-proxy/use-cases/io-models/GetRemoteIdpRequestModel'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'

describe('GetRemoteIdpControllerMapper', () => {
  it('should return expected request model', () => {
    const fakeRequest: IRequest<GetByIdDTO> = {
      id: 'request id',
      body: {
        id: 'entity id'
      }
    }
    const expectedResponse: IRequestModel<GetRemoteIdpRequestModel> = {
      requestId: fakeRequest.id,
      request: fakeRequest.body
    }
    const sut = new GetRemoteIdpControllerMapper()
    expect(sut.map(fakeRequest)).toStrictEqual(expectedResponse)
  })
})