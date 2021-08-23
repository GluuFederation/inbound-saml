import { IKeyCertLoader } from '@sp-proxy/interface-adapters/protocols/IKeyCertLoader'
import { readFileSync } from 'fs'

export class KeyCertLoader implements IKeyCertLoader {
  async load(path: string): Promise<string> {
    readFileSync(path)
    return ''
  }
}
