import { GetExternalDataRequestModel } from '@get-saml-metadata/use-cases/GetExternalDataRequestModel'
import { IGetExternalDataOutputBoundary } from '@get-saml-metadata/use-cases/IGetExternalDataOutputBoundary'
import { IExternalDataMapper } from '@get-saml-metadata/use-cases/ports/IExternalDataMapper'
import { IMetadataMapper } from '@get-saml-metadata/use-cases/ports/IMetadataMapper'
import { IXmlMetadataLoaderGateway } from '@get-saml-metadata/use-cases/ports/IXmlMetadataLoaderGateway'

export interface IGetExternalDataInputBoundary {
  execute: (request: GetExternalDataRequestModel) => Promise<void>
}

export abstract class BaseGetExternalDataInteractor
  implements IGetExternalDataInputBoundary
{
  constructor(
    protected readonly xmlMetadataLoader: IXmlMetadataLoaderGateway,
    protected readonly metadataMapper: IMetadataMapper,
    protected readonly externalDataMapper: IExternalDataMapper,
    protected readonly presenter: IGetExternalDataOutputBoundary
  ) {}

  abstract execute(request: GetExternalDataRequestModel): Promise<void>
}
