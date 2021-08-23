import { IXmlData } from '@sp-proxy/use-cases/protocols/IXmlData'

interface ICertKeySet {
  publicCert: string
  privateKey: string
}

export interface IMetadataGeneratorParams {
  callbackUrl: string
  requestedIdentifierFormat: string
  authnContextIdentifierFormat: string
  skipRequestCompression: boolean
  decryption: ICertKeySet
  signing?: ICertKeySet
}

export interface IMetadataGenerator {
  // generate: (params: IMetadataGeneratorParams) => Promise<XmlData>
  generate: (params: IMetadataGeneratorParams) => Promise<IXmlData>
}
