import { RemoteIdpDeliveryProps } from '@sp-proxy/interface-adapters/delivery/dtos/RemoteIdpDeliveryProps'
import { IDeliveryMapper } from '@sp-proxy/interface-adapters/protocols/IDeliveryMapper'
import { IResponse } from '@sp-proxy/interface-adapters/protocols/IResponse'
import { IResponseModel } from '@sp-proxy/use-cases/io-models/IResponseModel'
import { RemoteIdpMainModel } from '@sp-proxy/use-cases/io-models/main-models/RemoteIdpMainModel'

export class GetRemoteIdpPresenterMapper
  implements
    IDeliveryMapper<
      IResponseModel<RemoteIdpMainModel>,
      IResponse<RemoteIdpDeliveryProps>
    >
{
  map(
    responseModel: IResponseModel<RemoteIdpMainModel>
  ): IResponse<RemoteIdpDeliveryProps> {
    return {
      requestId: responseModel.requestId,
      body: responseModel.response
    }
  }
}
