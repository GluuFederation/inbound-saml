import { IGenerateMetadataRequest } from '@sp-proxy/interface-adapters/delivery/dtos/IGenerateMetadataRequest'
import { GenerateMetadataControllerMapper } from '@sp-proxy/interface-adapters/delivery/mappers/GenerateMetadataControllerMapper'
import { IRequest } from '@sp-proxy/interface-adapters/protocols/IRequest'
import { GenerateMetadataRequestUseCaseParams } from '@sp-proxy/use-cases/io-models/GenerateMetadataRequestUseCaseParams'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'

describe('GenerateMetadataControllerMapper', () => {
  it('should map dto to request model', () => {
    const fakeRequestDto: IRequest<IGenerateMetadataRequest> = {
      id: 'fake request id',
      body: 'generate metadata request'
    }
    const expectedResponse: IRequestModel<GenerateMetadataRequestUseCaseParams> =
      {
        requestId: 'fake request id',
        request: 'GenerateSpMetadata'
      }
    const sut = new GenerateMetadataControllerMapper()
    expect(sut.map(fakeRequestDto)).toStrictEqual(expectedResponse)
  })
})
