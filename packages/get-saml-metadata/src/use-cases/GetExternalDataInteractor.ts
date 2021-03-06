import { GetExternalDataRequestModel } from '@get-saml-metadata/use-cases/GetExternalDataRequestModel'
import {
  BaseGetExternalDataInteractor,
  IGetExternalDataInputBoundary
} from '@get-saml-metadata/use-cases/IGetExternalDataInputBoundary'

export class GetExternalDataInteractor
  extends BaseGetExternalDataInteractor
  implements IGetExternalDataInputBoundary
{
  async execute(request: GetExternalDataRequestModel): Promise<void> {
    const loadedXmlData = await this.xmlMetadataLoader.load(request.urlOrPath)
    const externalData = this.externalDataMapper.map(
      this.metadataMapper.map(loadedXmlData.props.xml)
    )
    await this.presenter.present({
      requestId: request.requestId,
      response: {
        externalData
      }
    })
  }
}
