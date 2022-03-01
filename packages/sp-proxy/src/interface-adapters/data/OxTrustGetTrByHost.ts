import { TrustRelation } from '@sp-proxy/entities/TrustRelation'
import { IGetTrByHostGateway } from '@sp-proxy/use-cases/ports/IGetTrByHostGateway'
import axios from 'axios'
import { IDataMapper } from '../protocols/IDataMapper'
import { TrustRelationDataModel } from './models/TrustRelationDataModel'
import { IOxTrustApiSettings } from './protocols/IOxTrustApiSettings'

export class OxTrustGetTrByHost implements IGetTrByHostGateway {
  private readonly getUrl: string
  constructor(
    private readonly dataMapper: IDataMapper<
      TrustRelationDataModel,
      TrustRelation
    >,
    private readonly oxTrustApiSettings: IOxTrustApiSettings
  ) {
    this.getUrl = `https://${oxTrustApiSettings.host}/${oxTrustApiSettings.completePath}/trusted-idps`
  }

  async findByHost(host: string): Promise<TrustRelation> {
    const urlWithHost = `${this.getUrl}/${host}`
    await axios.get(urlWithHost)
    return '' as any
  }
}
