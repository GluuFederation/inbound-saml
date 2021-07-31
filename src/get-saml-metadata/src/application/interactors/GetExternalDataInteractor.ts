import { IXmlMetadataLoaderRepository } from '../../domain/utils/IXmlMetadataLoaderRepository'
import { IExternalDataMapper } from '../protocols/IExternalDataMapper'
import { IMetadataMapper } from '../protocols/IMetadataMapper'
import { GetExternalDataRequestModel } from './GetExternalDataRequestModel'
import { IGetExternalDataInputBoundary } from './IGetExternalDataInputBoundary'
import { IGetExternalDataOutputBoundary } from './IGetExternalDataOutputBoundary'

export class GetExternalDataInteractor implements IGetExternalDataInputBoundary {
  private readonly xmlMetadataLoader: IXmlMetadataLoaderRepository
  private readonly metadataMapper: IMetadataMapper
  private readonly externalDataMapper: IExternalDataMapper
  private readonly presenter: IGetExternalDataOutputBoundary

  constructor (
    xmlMetadataLoader: IXmlMetadataLoaderRepository,
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
