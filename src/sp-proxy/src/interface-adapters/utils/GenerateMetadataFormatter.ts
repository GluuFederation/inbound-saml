import { IKeyCertFormatter } from '@sp-proxy/interface-adapters/protocols/IKeySetFormatter'

export class GenerateMetadataFormatter implements IKeyCertFormatter {
  async format(keyOrCert: string): Promise<string> {
    return keyOrCert
      .replace(/(\r\n|\n|\r)/gm, '')
      .replace('-----BEGIN CERTIFICATE-----', '')
      .replace('-----END CERTIFICATE-----', '')
      .replace('-----BEGIN ENCRYPTED PRIVATE KEY-----', '')
      .replace('-----END ENCRYPTED PRIVATE KEY-----', '')
  }
}
