import { TrustRelation } from '@sp-proxy/entities/TrustRelation'
import { IAddTrGateway } from '@sp-proxy/use-cases/ports/IAddTrGateway'
import axios from 'axios'

interface IOxTrustApiSettings {
  uri: string
  path: string
  trustRelationEndpoint: string
}

export class OxTrustAddTrustRelation implements IAddTrGateway {
  private readonly postUrl: string
  constructor(private readonly oxTrustApiSettings: IOxTrustApiSettings) {
    this.postUrl = `${oxTrustApiSettings.uri}/${oxTrustApiSettings.path}/${oxTrustApiSettings.trustRelationEndpoint}`
  }

  async add(trustRelation: TrustRelation): Promise<boolean> {
    await axios.post(this.postUrl)
    return true
  }
}
