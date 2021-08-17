import { IDeliveryMapper } from '@sp-proxy/interface-adapters/protocols/IDeliveryMapper'
import { IResponse } from '@sp-proxy/interface-adapters/protocols/IResponse'
import { RemoteIdpDeliveryProps } from '@sp-proxy/interface-adapters/protocols/RemoteIdpDeliveryProps'
import { IResponseModel } from '@sp-proxy/use-cases/io-models/IResponseModel'
import { RemoteIdpUseCaseProps } from '@sp-proxy/use-cases/io-models/RemoteIdpUseCaseProps'

export class GetRemoteIdpPresenterMapper
  implements
    IDeliveryMapper<
      IResponseModel<RemoteIdpUseCaseProps>,
      IResponse<RemoteIdpDeliveryProps>
    >
{
  map(
    responseModel: IResponseModel<RemoteIdpUseCaseProps>
  ): IResponse<RemoteIdpDeliveryProps> {
    return {
      requestId: responseModel.requestId,
      body: responseModel.response
    }
  }
}
