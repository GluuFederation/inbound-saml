import { TrustRelation } from '@sp-proxy/entities/TrustRelation'
import { IGetTrByHostGateway } from '@sp-proxy/use-cases/ports/IGetTrByHostGateway'
import axios, { AxiosResponse } from 'axios'
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
    const response: AxiosResponse<TrustRelationDataModel> = await axios.get(
      urlWithHost
    )
    const trustRelationDataModel: TrustRelationDataModel = response.data
    const trustRelation = await this.dataMapper.map(trustRelationDataModel)
    return trustRelation
  }
}
