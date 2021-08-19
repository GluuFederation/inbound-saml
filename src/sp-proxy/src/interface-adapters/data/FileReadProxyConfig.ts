import { SpProxyConfig } from '@sp-proxy/entities/SpProxyConfig'
import { IReadProxyConfigGateway } from '@sp-proxy/use-cases/ports/IReadProxyConfigGateway'
import cfg from '@sp-proxy/interface-adapters/data/config/env'
import { readFileSync } from 'fs'
import { SpProxyConfigProps } from '@sp-proxy/entities/protocols/SpProxyConfigProps'
export class FileReadProxyConfig implements IReadProxyConfigGateway {
  async read(): Promise<SpProxyConfig> {
    // 🙏🏻 🙏🏻 🙏🏻
    const parsedFromFile: SpProxyConfigProps = JSON.parse(
      readFileSync(cfg.database.file.proxyConfigPath).toString()
    )
    return new SpProxyConfig(parsedFromFile)
  }
}
