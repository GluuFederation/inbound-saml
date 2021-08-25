import { TrustRelation } from '@sp-proxy/entities/TrustRelation'
import { IDataMapper } from '@sp-proxy/interface-adapters/protocols/IDataMapper'
import { IGetTrByHostGateway } from '@sp-proxy/use-cases/ports/IGetTrByHostGateway'
import { Collection, Document as MongoDocument } from 'mongodb'

export class MongoGetTrByHost implements IGetTrByHostGateway {
  constructor(
    private readonly collection: Collection,
    private readonly dataMapper: IDataMapper<MongoDocument, TrustRelation>
  ) {}

  async findByHost(host: string): Promise<TrustRelation> {
    await this.collection.findOne({
      'trustRelation.props.singleSignOnService.props.location': new RegExp(host)
    })
    return '' as any
  }
}
