import { IReadSpProxyConfigRequest } from '@sp-proxy/interface-adapters/delivery/dtos/IReadSpProxyConfigRequest'
import { ReadSpProxyConfigControllerMapper } from '@sp-proxy/interface-adapters/delivery/mappers/ReadSpProxyConfigControllerMapper'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'
import { ReadSpProxyConfigRequestUseCaseParams } from '@sp-proxy/use-cases/io-models/ReadSpProxyConfigRequestUseCaseParams'

describe('ReadSpProxyConfigControllerMapper', () => {
  it('should map dto to request model', () => {
    const fakeRequestDto: IRequest<IReadSpProxyConfigRequest> = {
      id: 'fake request id',
      body: null
    }
    const sut = new ReadSpProxyConfigControllerMapper()
    const expectedRequestModel: IRequestModel<ReadSpProxyConfigRequestUseCaseParams> =
      {
        requestId: fakeRequestDto.id,
        request: fakeRequestDto.body
      }
    expect(sut.map(fakeRequestDto)).toStrictEqual(expectedRequestModel)
  })
})
