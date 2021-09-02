import { IRemoteIdpProps } from '@sp-proxy/entities/IRemoteIdp'
import { RemoteIdp } from '@sp-proxy/entities/RemoteIdp'
import { UuidType } from '@sp-proxy/entities/types/UuidType'

export const makeRemoteIdp = (
  props: IRemoteIdpProps,
  id?: UuidType
): RemoteIdp => {
  return new RemoteIdp(props, id)
}
