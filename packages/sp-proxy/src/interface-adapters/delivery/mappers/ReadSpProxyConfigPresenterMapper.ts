import { IReadSpProxyConfigResponse } from '@sp-proxy/interface-adapters/delivery/dtos/IReadSpProxyConfigResponse'
import { IDeliveryMapper } from '@sp-proxy/interface-adapters/protocols/IDeliveryMapper'
import { IResponse } from '@sp-proxy/interface-adapters/protocols/IResponse'
import { IResponseModel } from '@sp-proxy/use-cases/io-models/IResponseModel'
import { ReadSpProxyConfigResponseUseCaseParams } from '@sp-proxy/use-cases/io-models/ReadSpProxyConfigResponseUseCaseParams'

export class ReadSpProxyConfigPresenterMapper
  implements
    IDeliveryMapper<
      IResponseModel<ReadSpProxyConfigResponseUseCaseParams>,
      IResponse<IReadSpProxyConfigResponse>
    >
{
  map(
    responseModel: IResponseModel<ReadSpProxyConfigResponseUseCaseParams>
  ): IResponse<IReadSpProxyConfigResponse> {
    const responseDto: IResponse<IReadSpProxyConfigResponse> = {
      requestId: responseModel.requestId,
      body: {
        host: responseModel.response.host,
        requestedIdentifierFormat:
          responseModel.response.requestedIdentifierFormat,
        authnContextIdentifierFormat:
          responseModel.response.authnContextIdentifierFormat,
        skipRequestCompression: responseModel.response.skipRequestCompression,
        decryption: {
          privateKey: responseModel.response.decryption.privateKey,
          cert: responseModel.response.decryption.cert
        }
      }
    }
    if (responseModel.response.signing != null) {
      responseDto.body.signing = {
        privateKey: responseModel.response.signing.privateKey,
        cert: responseModel.response.signing.cert
      }
    }
    return responseDto
  }
}
