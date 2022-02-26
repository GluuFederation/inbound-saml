import { TrustRelation } from '@sp-proxy/entities/TrustRelation'
import { IAddTrGateway } from '@sp-proxy/use-cases/ports/IAddTrGateway'
import axios from 'axios'
import { IDataMapper } from '../protocols/IDataMapper'
import { TrustRelationDataModel } from './models/TrustRelationDataModel'
import { IOxTrustApiSettings } from './protocols/IOxTrustApiSettings'

export class OxTrustAddTrustRelation implements IAddTrGateway {
  private readonly postUrl: string

  constructor(
    private readonly oxTrustApiSettings: IOxTrustApiSettings,
    private readonly addTrustRelationOxTrustMapper: IDataMapper<
      TrustRelation,
      TrustRelationDataModel
    >
  ) {
    const trustRelationEndpoint = 'trusted-idp'
    this.postUrl = `https://${oxTrustApiSettings.host}/${oxTrustApiSettings.completePath}/${trustRelationEndpoint}`
  }

  async add(trustRelation: TrustRelation): Promise<boolean> {
    await this.addTrustRelationOxTrustMapper.map(trustRelation)
    await axios.post(this.postUrl)
    return true
  }
}
