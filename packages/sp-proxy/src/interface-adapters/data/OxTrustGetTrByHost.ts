import { TrustRelation } from '@sp-proxy/entities/TrustRelation'
import { IGetTrByHostGateway } from '@sp-proxy/use-cases/ports/IGetTrByHostGateway'
import axios from 'axios'
import { IDataMapper } from '../protocols/IDataMapper'
import { TrustRelationDataModel } from './models/TrustRelationDataModel'
import { IOxTrustApiSettings } from './protocols/IOxTrustApiSettings'

export class OxTrustGetTrByHost implements IGetTrByHostGateway {
  constructor(
    private readonly dataMapper: IDataMapper<
      TrustRelationDataModel,
      TrustRelation
    >,
    private readonly oxTrustApiSettings: IOxTrustApiSettings
  ) {}

  async findByHost(host: string): Promise<TrustRelation> {
    await axios.get('a')
    return '' as any
  }
}
