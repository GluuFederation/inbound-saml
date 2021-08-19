import { SpProxyConfig } from '@sp-proxy/entities/SpProxyConfig'
import { IReadProxyConfigGateway } from '@sp-proxy/use-cases/ports/IReadProxyConfigGateway'
import cfg from '@sp-proxy/interface-adapters/data/config/env'
import { readFileSync } from 'fs'
export class FileReadProxyConfig implements IReadProxyConfigGateway {
  async read(): Promise<SpProxyConfig> {
    JSON.parse(readFileSync(cfg.database.file.proxyConfigPath).toString())
    return new SpProxyConfig({
      host: 'valid hostname',
      requestedIdentifierFormat: 'valid requestedIdentifierFormat',
      authnContextIdentifierFormat: 'valid authnContextIdentifierFormat',
      skipRequestCompression: false,
      decryption: {
        publicCertPath: '/valid/path/to/decryption/cert.crt',
        privateKeyPath: '/valid/path/to/decryption/private.pem'
      },
      signing: {
        publicCertPath: '/valid/path/to/signing/cert.crt',
        privateKeyPath: '/valid/path/to/signing/private.pem'
      }
    })
  }
}
