import { IRemoteIdpProps } from '@sp-proxy/entities/IRemoteIdp'
import { BaseEntity } from '@sp-proxy/entities/types/BaseEntity'

export class RemoteIdp extends BaseEntity<IRemoteIdpProps> {
  public get id(): string {
    return this._id
  }
}
