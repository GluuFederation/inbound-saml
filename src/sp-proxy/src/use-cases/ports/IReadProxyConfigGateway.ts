import { SpProxyConfig } from '@sp-proxy/entities/SpProxyConfig'

export interface IReadProxyConfigGateway {
  read: () => Promise<SpProxyConfig>
}
