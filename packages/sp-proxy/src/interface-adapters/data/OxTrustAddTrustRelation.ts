import { TrustRelation } from '@sp-proxy/entities/TrustRelation'
import { IAddTrGateway } from '@sp-proxy/use-cases/ports/IAddTrGateway'
import axios from 'axios'
import { IDataMapper } from '../protocols/IDataMapper'
import { TrustRelationDataModel } from './models/TrustRelationDataModel'
import { IOxTrustApiSettings } from './protocols/IOxTrustApiSettings'
import { IUmaAuthenticator } from './protocols/IUmaAuthenticator'

export class OxTrustAddTrustRelation implements IAddTrGateway {
  private readonly postUrl: string

  constructor(
    private readonly oxTrustApiSettings: IOxTrustApiSettings,
    private readonly addTrustRelationOxTrustMapper: IDataMapper<
      TrustRelation,
      TrustRelationDataModel
    >,
    private readonly authenticator: IUmaAuthenticator
  ) {
    const trustRelationEndpoint = 'trusted-idp'
    this.postUrl = `https://${oxTrustApiSettings.host}/${oxTrustApiSettings.completePath}/${trustRelationEndpoint}`
  }

  async add(trustRelation: TrustRelation): Promise<boolean> {
    const trustRelationDataModel = await this.addTrustRelationOxTrustMapper.map(
      trustRelation
    )
    try {
      const response = await axios.post(this.postUrl, trustRelationDataModel)
      if (response.status !== 201) {
        throw new Error(
          `Trust relation creation emndpoind responded with ${response.status}`
        )
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          await this.authenticator.authenticate(this.postUrl)
          return true
        } else {
          throw new Error(error.message)
        }
      } else {
        if (error instanceof Error) {
          throw new Error(error.message)
        }
      }
    }
    return true
  }
}
