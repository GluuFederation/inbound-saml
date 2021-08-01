import { GetExternalDataRequestModel } from './GetExternalDataRequestModel'
import { IGetExternalDataInputBoundary } from './IGetExternalDataInputBoundary'
import { IGetExternalDataOutputBoundary } from './IGetExternalDataOutputBoundary'
import { IExternalDataMapper } from './ports/IExternalDataMapper'
import { IMetadataMapper } from './ports/IMetadataMapper'
import { IXmlMetadataLoaderGateway } from './ports/IXmlMetadataLoaderGateway'

export class GetExternalDataInteractor implements IGetExternalDataInputBoundary {
  private readonly xmlMetadataLoader: IXmlMetadataLoaderGateway
  private readonly metadataMapper: IMetadataMapper
  private readonly externalDataMapper: IExternalDataMapper
  private readonly presenter: IGetExternalDataOutputBoundary

  /**
   * @param xmlMetadataLoader Loads metadata from file or url...
   * @param metadataMapper maps xmldata to IMetatada
   * @param externalDataMapper  maps IMetadata to IExternalData
   * @param presenter presents output
   */
  constructor (
    xmlMetadataLoader: IXmlMetadataLoaderGateway,
    metadataMapper: IMetadataMapper,
    externalDataMapper: IExternalDataMapper,
    presenter: IGetExternalDataOutputBoundary
  ) {
    this.xmlMetadataLoader = xmlMetadataLoader
    this.metadataMapper = metadataMapper
    this.externalDataMapper = externalDataMapper
    this.presenter = presenter
  }

  async execute (request: GetExternalDataRequestModel): Promise<void> {
    const externalData = this.externalDataMapper.map(
      this.metadataMapper.map(
        this.xmlMetadataLoader.load(request.urlOrPath).props.xml
      )
    )
    this.presenter.present(
      {
        requestId: request.requestId,
        response: {
          externalData
        }
      }
    )
  }
}
