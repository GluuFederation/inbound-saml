import { CertKeySetType } from '@sp-proxy/use-cases/protocols/CertKeySetType'
import { IXmlData } from '@sp-proxy/use-cases/protocols/IXmlData'

export interface IMetadataGenerator {
  // generate: (params: IMetadataGeneratorParams) => Promise<XmlData>
  generate: (
    decryptionKeySet?: CertKeySetType,
    signingKeySet?: CertKeySetType
  ) => Promise<IXmlData>
}
