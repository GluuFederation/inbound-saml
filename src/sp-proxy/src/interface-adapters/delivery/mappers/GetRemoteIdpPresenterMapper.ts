import { IDeliveryMapper } from '@sp-proxy/interface-adapters/protocols/IDeliveryMapper'
import { IResponse } from '@sp-proxy/interface-adapters/protocols/IResponse'
import { RemoteIdpDeliveryProps } from '@sp-proxy/interface-adapters/protocols/RemoteIdpDeliveryProps'
import { IResponseModel } from '@sp-proxy/use-cases/io-models/IResponseModel'
import { RemoteIdpUseCaseParams } from '@sp-proxy/use-cases/io-models/RemoteIdpUseCaseParams'

export class GetRemoteIdpPresenterMapper
  implements
    IDeliveryMapper<
      IResponseModel<RemoteIdpUseCaseParams>,
      IResponse<RemoteIdpDeliveryProps>
    >
{
  map(
    responseModel: IResponseModel<RemoteIdpUseCaseParams>
  ): IResponse<RemoteIdpDeliveryProps> {
    return {
      requestId: responseModel.requestId,
      body: responseModel.response
    }
  }
}
