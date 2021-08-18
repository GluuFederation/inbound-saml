import { AddTrFromMetadataPresenterMapper } from '@sp-proxy/interface-adapters/delivery/mappers/AddTrFromMetadataPresenterMapper'
import { IAddTrFromMetadataResponse } from '@sp-proxy/interface-adapters/delivery/dtos/IAddTrFromMetadataResponse'
import { IResponse } from '@sp-proxy/interface-adapters/protocols/IResponse'
import { IResponseModel } from '@sp-proxy/use-cases/io-models/IResponseModel'
import { SuccessResponseUseCaseParams } from '@sp-proxy/use-cases/io-models/SuccessResponseUseCaseParams'

describe('AddTrFromMetadataPresenterMapper', () => {
  it('should return expected dto', () => {
    const sut = new AddTrFromMetadataPresenterMapper()
    const fakeResponseModel: IResponseModel<SuccessResponseUseCaseParams> = {
      requestId: 'fake request id',
      response: {
        success: true
      }
    }
    const expectedDto: IResponse<IAddTrFromMetadataResponse> = {
      requestId: fakeResponseModel.requestId,
      body: {
        success: fakeResponseModel.response.success
      }
    }
    expect(sut.map(fakeResponseModel)).toStrictEqual(expectedDto)
  })
})
