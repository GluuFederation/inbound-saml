import { TrustRelation } from '@sp-proxy/entities/TrustRelation'
import { IAddTrGateway } from '@sp-proxy/use-cases/ports/IAddTrGateway'
import axios from 'axios'
import { IOxTrustApiSettings } from './protocols/IOxTrustApiSettings'

export class OxTrustAddTrustRelation implements IAddTrGateway {
  private readonly postUrl: string
  constructor(private readonly oxTrustApiSettings: IOxTrustApiSettings) {
    const trustRelationEndpoint = 'trusted-idp'
    this.postUrl = `https://${oxTrustApiSettings.host}/${oxTrustApiSettings.completePath}/${trustRelationEndpoint}`
  }

  async add(trustRelation: TrustRelation): Promise<boolean> {
    await axios.post(this.postUrl)
    return true
  }
}
