import { IGetTrByHostResponse } from '@sp-proxy/interface-adapters/delivery/dtos/IGetTrByHostResponse'
import { IDeliveryMapper } from '@sp-proxy/interface-adapters/protocols/IDeliveryMapper'
import { IResponse } from '@sp-proxy/interface-adapters/protocols/IResponse'
import { GetTrByHostResponseUseCaseParams } from '@sp-proxy/use-cases/io-models/GetTrByHostResponseUseCaseParams'
import { IResponseModel } from '@sp-proxy/use-cases/io-models/IResponseModel'

export class GetTrByHostPresenterMapper
  implements
    IDeliveryMapper<
      IResponseModel<GetTrByHostResponseUseCaseParams>,
      IResponse<IGetTrByHostResponse>
    >
{
  map(
    responseModel: IResponseModel<GetTrByHostResponseUseCaseParams>
  ): IResponse<IGetTrByHostResponse> {
    return {
      requestId: responseModel.requestId,
      body: {
        id: responseModel.response.id,
        selectedSsoService: {
          binding: responseModel.response.selectedSsoService.binding,
          location: responseModel.response.selectedSsoService.location
        },
        remoteIdp: {
          id: responseModel.response.remoteIdp.id,
          name: responseModel.response.remoteIdp.name,
          singleSignOnService: [
            {
              binding:
                responseModel.response.remoteIdp.singleSignOnService[0].binding,
              location:
                responseModel.response.remoteIdp.singleSignOnService[0].location
            }
          ],
          signingCertificates:
            responseModel.response.remoteIdp.signingCertificates
        }
      }
    }
  }
}
