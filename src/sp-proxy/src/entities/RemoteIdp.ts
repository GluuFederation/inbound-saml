import { IRemoteIdpProps } from '@sp-proxy/entities/IRemoteIdp'
import { IValidator } from '@sp-proxy/entities/protocols/IValidator'
import { BaseEntity } from '@sp-proxy/entities/types/BaseEntity'
import { UuidType } from '@sp-proxy/entities/types/UuidType'

export class RemoteIdp extends BaseEntity<IRemoteIdpProps> {
  private constructor(
    props: IRemoteIdpProps,
    validator: IValidator,
    id?: UuidType
  ) {
    super(props, id)
  }
}
