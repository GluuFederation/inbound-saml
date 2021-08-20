import { SpProxyConfig } from '@sp-proxy/entities/SpProxyConfig'
import { IReadProxyConfigGateway } from '@sp-proxy/use-cases/ports/IReadProxyConfigGateway'
import cfg from '@sp-proxy/interface-adapters/data/config/env'
import { readFileSync } from 'fs'
import { SpProxyConfigProps } from '@sp-proxy/entities/protocols/SpProxyConfigProps'
import { PersistenceError } from '@sp-proxy/interface-adapters/data/errors/PersistenceError'
export class FileReadProxyConfig implements IReadProxyConfigGateway {
  async read(): Promise<SpProxyConfig> {
    // 🙏🏻 🙏🏻 🙏🏻
    try {
      const parsedProps: SpProxyConfigProps = JSON.parse(
        readFileSync(cfg.database.file.proxyConfigPath).toString()
      )
      return new SpProxyConfig(parsedProps)
    } catch (err) {
      const error = err as Error
      throw new PersistenceError(
        `error fetching configuration from file: ${error.name} - ${error.message}`
      )
    }
  }
}
