import { IAddTrFromMetadataResponse } from '@sp-proxy/interface-adapters/delivery/dtos//IAddTrFromMetadataResponse'
import { IDeliveryMapper } from '@sp-proxy/interface-adapters/protocols/IDeliveryMapper'
import { IResponse } from '@sp-proxy/interface-adapters/protocols/IResponse'
import { IResponseModel } from '@sp-proxy/use-cases/io-models/IResponseModel'
import { SuccessResponseUseCaseParams } from '@sp-proxy/use-cases/io-models/response/SuccessResponseUseCaseParams'

export class AddTrFromMetadataPresenterMapper
  implements
    IDeliveryMapper<
      IResponseModel<SuccessResponseUseCaseParams>,
      IResponse<IAddTrFromMetadataResponse>
    >
{
  map(
    responseModel: IResponseModel<SuccessResponseUseCaseParams>
  ): IResponse<IAddTrFromMetadataResponse> {
    return {
      requestId: responseModel.requestId,
      body: {
        success: responseModel.response.success
      }
    }
  }
}
