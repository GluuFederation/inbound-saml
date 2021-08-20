import { IXmlData } from '@sp-proxy/use-cases/protocols/IXmlData'

interface ICertKeySetPath {
  publicCertPath: string
  privateKeyPath?: string
}

export interface IMetadataGeneratorParams {
  host: string
  requestedIdentifierFormat: string
  authnContextIdentifierFormat: string
  skipRequestCompression: boolean
  decryption: ICertKeySetPath
  signing: ICertKeySetPath
}

export interface IMetadataGenerator {
  // generate: (params: IMetadataGeneratorParams) => Promise<XmlData>
  generate: (params: IMetadataGeneratorParams) => Promise<IXmlData>
}
