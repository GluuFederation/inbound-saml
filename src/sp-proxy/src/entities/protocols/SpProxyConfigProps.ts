type HostType = string
type NameIdentifierFormatType = string
type FilePathType = string

interface CertKeySetPath {
  publicCertPath: FilePathType
  privateKeyPath: FilePathType
}

export interface SpProxyConfigProps {
  host: HostType
  requestedIdentifierFormat: NameIdentifierFormatType
  authnContextIdentifierFormat: NameIdentifierFormatType
  skipRequestCompression: boolean
  decryption: CertKeySetPath
  signing: CertKeySetPath
}
