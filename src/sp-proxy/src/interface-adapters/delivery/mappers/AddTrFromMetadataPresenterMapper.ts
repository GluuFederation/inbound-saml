import { IAddTrFromMetadataResponse } from '@sp-proxy/interface-adapters/protocols/IAddTrFromMetadataResponse'
import { IDeliveryMapper } from '@sp-proxy/interface-adapters/protocols/IDeliveryMapper'
import { IResponse } from '@sp-proxy/interface-adapters/protocols/IResponse'
import { IResponseModel } from '@sp-proxy/use-cases/io-models/IResponseModel'
import { SuccessResponseModel } from '@sp-proxy/use-cases/io-models/SuccessResponseModel'

export class AddTrFromMetadataPresenterMapper
  implements
    IDeliveryMapper<
      IResponseModel<SuccessResponseModel>,
      IResponse<IAddTrFromMetadataResponse>
    >
{
  map(
    responseModel: IResponseModel<SuccessResponseModel>
  ): IResponse<IAddTrFromMetadataResponse> {
    return {
      requestId: responseModel.requestId,
      body: {
        success: responseModel.response.success
      }
    }
  }
}
