import { TrustRelation } from '@sp-proxy/entities/TrustRelation'
import { IAddTrGateway } from '@sp-proxy/use-cases/ports/IAddTrGateway'
import axios, { AxiosRequestConfig } from 'axios'
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
      TrustRelationDataModel.Params
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
    const token = await this.authenticator.authenticate(this.postUrl, 'POST')
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const response = await axios.post(
      this.postUrl,
      trustRelationDataModel,
      config
    )
    if (response.status !== 201) {
      throw new Error(
        `Received unexpected response status code ${response.status}`
      )
    }
    return true
  }
}
