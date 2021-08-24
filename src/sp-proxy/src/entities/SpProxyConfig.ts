import { SpProxyConfigProps } from '@sp-proxy/entities/protocols/SpProxyConfigProps'
import { BaseEntity } from '@sp-proxy/entities/types/BaseEntity'

/**
 * Entity for proxy specific configurations
 * Should only exist one
 */
export class SpProxyConfig extends BaseEntity<SpProxyConfigProps> {}
