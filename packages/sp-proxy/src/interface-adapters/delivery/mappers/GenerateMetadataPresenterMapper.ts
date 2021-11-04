import { IGenerateMetadataResponse } from '@sp-proxy/interface-adapters/delivery/dtos/IGenerateMetadataResponse'
import { IDeliveryMapper } from '@sp-proxy/interface-adapters/protocols/IDeliveryMapper'
import { IResponse } from '@sp-proxy/interface-adapters/protocols/IResponse'
import { GenerateMetadataResponseUseCaseParams } from '@sp-proxy/use-cases/io-models/response/GenerateMetadataResponseUseCaseParams'
import { IResponseModel } from '@sp-proxy/use-cases/io-models/IResponseModel'

export class GenerateMetadataPresenterMapper
  implements
    IDeliveryMapper<
      IResponseModel<GenerateMetadataResponseUseCaseParams>,
      IResponse<IGenerateMetadataResponse>
    >
{
  map(
    responseModel: IResponseModel<GenerateMetadataResponseUseCaseParams>
  ): IResponse<IGenerateMetadataResponse> {
    return {
      requestId: responseModel.requestId,
      body: {
        metadata: responseModel.response.xmldata
      }
    }
  }
}
