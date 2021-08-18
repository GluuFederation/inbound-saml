import { AddTrFromMetadataControllerMapper } from '@sp-proxy/interface-adapters/delivery/mappers/AddTrFromMetadataControllerMapper'
import { IAddTrFromMetadataRequest } from '@sp-proxy/interface-adapters/protocols/IAddTrFromMetadataRequest'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
import { AddTrFromMetadataUseCaseParams } from '@sp-proxy/use-cases/io-models/AddTrFromMetadataUseCaseParams'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'

describe('AddTrFromMetadataControllerMapper', () => {
  it('should return expected request model', () => {
    const sut = new AddTrFromMetadataControllerMapper()
    const fakeDto: IRequest<IAddTrFromMetadataRequest> = {
      id: 'fake request id',
      body: {
        name: 'fake TR name',
        url: 'fake url'
      }
    }
    const expectedRequestModel: IRequestModel<AddTrFromMetadataUseCaseParams> =
      {
        requestId: fakeDto.id,
        request: fakeDto.body
      }
    expect(sut.map(fakeDto)).toStrictEqual(expectedRequestModel)
  })
})
