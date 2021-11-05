import { IGetTrByHostRequest } from '@sp-proxy/interface-adapters/delivery/dtos/IGetTrByHostRequest'
import { GetTrByHostControllerMapper } from '@sp-proxy/interface-adapters/delivery/mappers/GetTrByHostControllerMapper'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'
import { GetTrByHostRequestUseCaseParams } from '@sp-proxy/use-cases/io-models/request/GetTrByHostRequestUseCaseParams'

describe('GetTrByHostControllerMapper.ts', () => {
  it('should map dto to request model', () => {
    const fakeRequest: IRequest<IGetTrByHostRequest> = {
      id: 'fake request id',
      body: {
        host: 'fake host'
      }
    }
    const expectedRequestModel: IRequestModel<GetTrByHostRequestUseCaseParams> =
      {
        requestId: fakeRequest.id,
        request: {
          host: fakeRequest.body.host
        }
      }
    const sut = new GetTrByHostControllerMapper()
    expect(sut.map(fakeRequest)).toStrictEqual(expectedRequestModel)
  })
})
