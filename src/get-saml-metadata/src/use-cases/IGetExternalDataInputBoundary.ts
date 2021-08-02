import { GetExternalDataRequestModel } from './GetExternalDataRequestModel'
import { IGetExternalDataOutputBoundary } from './IGetExternalDataOutputBoundary'
import { IExternalDataMapper } from './ports/IExternalDataMapper'
import { IMetadataMapper } from './ports/IMetadataMapper'
import { IXmlMetadataLoaderGateway } from './ports/IXmlMetadataLoaderGateway'

export interface IGetExternalDataInputBoundary{
  execute: (request: GetExternalDataRequestModel) => Promise<void>
}

export abstract class BaseGetExternalDataInteractor implements IGetExternalDataInputBoundary {
  constructor (
    protected readonly xmlMetadataLoader: IXmlMetadataLoaderGateway,
    protected readonly metadataMapper: IMetadataMapper,
    protected readonly externalDataMapper: IExternalDataMapper,
    protected readonly presenter: IGetExternalDataOutputBoundary
  ) {}

  abstract execute (request: GetExternalDataRequestModel): Promise<void>
}
