import { IXmlMetadataLoadService } from '../../domain/services/protocols/IXmlMetadataLoadService'
import { GetExternalDataRequestModel } from './GetExternalDataRequestModel'
import { IGetExternalDataInputBoundary } from './IGetExternalDataInputBoundary'

export class GetExternalDataInteractor implements IGetExternalDataInputBoundary {
  private readonly xmlMetadataLoadService: IXmlMetadataLoadService
  constructor (
    xmlMetadataLoadService: IXmlMetadataLoadService
  ) {
    this.xmlMetadataLoadService = xmlMetadataLoadService
  }

  async execute (request: GetExternalDataRequestModel): Promise<void> {
    this.xmlMetadataLoadService.load()
  }
}
