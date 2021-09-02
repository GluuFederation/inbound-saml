import { IGenerateMetadataResponse } from '@sp-proxy/interface-adapters/delivery/dtos/IGenerateMetadataResponse'
import { GenerateMetadataPresenterMapper } from '@sp-proxy/interface-adapters/delivery/mappers/GenerateMetadataPresenterMapper'
import { IResponse } from '@sp-proxy/interface-adapters/protocols/IResponse'
import { GenerateMetadataResponseUseCaseParams } from '@sp-proxy/use-cases/io-models/GenerateMetadataResponseUseCaseParams'
import { IResponseModel } from '@sp-proxy/use-cases/io-models/IResponseModel'

describe('GenerateMetadataPresenterMapper', () => {
  it('should map response model to dto', () => {
    const fakeResponseModel: IResponseModel<GenerateMetadataResponseUseCaseParams> =
      {
        requestId: 'fake request id',
        response: {
          xmldata: 'fake xml data'
        }
      }
    const expected: IResponse<IGenerateMetadataResponse> = {
      requestId: fakeResponseModel.requestId,
      body: {
        metadata: fakeResponseModel.response.xmldata
      }
    }
    const sut = new GenerateMetadataPresenterMapper()
    expect(sut.map(fakeResponseModel)).toStrictEqual(expected)
  })
})
