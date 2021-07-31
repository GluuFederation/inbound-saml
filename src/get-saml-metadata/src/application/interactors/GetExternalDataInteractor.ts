import { IXmlMetadataLoaderRepository } from '../../domain/utils/IXmlMetadataLoaderRepository'
import { IExternalDataMapper } from '../protocols/IExternalDataMapper'
import { IMetadataMapper } from '../protocols/IMetadataMapper'
import { GetExternalDataRequestModel } from './GetExternalDataRequestModel'
import { IGetExternalDataInputBoundary } from './IGetExternalDataInputBoundary'

export class GetExternalDataInteractor implements IGetExternalDataInputBoundary {
  private readonly xmlMetadataLoader: IXmlMetadataLoaderRepository
  private readonly metadataMapper: IMetadataMapper
  private readonly externalDataMapper: IExternalDataMapper

  constructor (
    xmlMetadataLoader: IXmlMetadataLoaderRepository,
    metadataMapper: IMetadataMapper,
    externalDataMapper: IExternalDataMapper
  ) {
    this.xmlMetadataLoader = xmlMetadataLoader
    this.metadataMapper = metadataMapper
    this.externalDataMapper = externalDataMapper
  }

  async execute (request: GetExternalDataRequestModel): Promise<void> {
    this.externalDataMapper.map(
      this.metadataMapper.map(
        this.xmlMetadataLoader.load(request.urlOrPath).props.xml
      )
    )
  }
}
