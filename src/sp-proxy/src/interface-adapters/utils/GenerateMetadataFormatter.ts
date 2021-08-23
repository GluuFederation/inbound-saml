import { IKeyCertFormatter } from '@sp-proxy/interface-adapters/protocols/IKeySetFormatter'

export class GenerateMetadataFormatter implements IKeyCertFormatter {
  async format(keyOrCert: string): Promise<string> {
    const anystring = 'any string'
    anystring.replace(/(\r\n|\n|\r)/gm, '')
    anystring.replace('-----BEGIN CERTIFICATE-----', '')
    anystring.replace('-----END CERTIFICATE-----', '')
    anystring.replace('-----BEGIN ENCRYPTED PRIVATE KEY-----', '')
    anystring.replace('-----END ENCRYPTED PRIVATE KEY-----', '')
    return 'not implemented'
  }
}
