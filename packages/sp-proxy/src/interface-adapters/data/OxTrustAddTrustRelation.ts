import { TrustRelation } from '@sp-proxy/entities/TrustRelation'
import { IAddTrGateway } from '@sp-proxy/use-cases/ports/IAddTrGateway'
import axios from 'axios'

export class OxTrustAddTrustRelation implements IAddTrGateway {
  async add(trustRelation: TrustRelation): Promise<boolean> {
    await axios.post('any url')
    return true
  }
}
