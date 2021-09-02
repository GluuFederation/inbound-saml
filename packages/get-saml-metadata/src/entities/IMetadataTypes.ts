// IMetadata aka EntityDescriptor
export interface IMetadata {
  entityID?: string
  idpssoDescriptor: IDPSSODescriptor
  attributeAuthorityDescriptor?: AttributeAuthorityDescriptor
  organization?: Organization
}

export interface AttributeAuthorityDescriptor {
  protocolSupportEnumeration: string
  extensions: AttributeAuthorityDescriptorExtensions
  keyDescriptor: KeyDescriptor[]
  attributeService: Service[]
  nameIDFormat: string[]
}

export interface Service {
  binding: string
  location: string
}

export interface AttributeAuthorityDescriptorExtensions {
  scope: Scope
}

export interface Scope {
  regexp: string
  text: string
}

export interface KeyDescriptor {
  use: string
  keyInfo: KeyInfo
}

export interface KeyInfo {
  x509Data: X509Data
}

export interface X509Data {
  x509Certificate: string
}

export interface IDPSSODescriptor {
  errorURL?: string
  protocolSupportEnumeration?: string
  extensions?: IDPSSODescriptorExtensions
  keyDescriptor: KeyDescriptor[]
  artifactResolutionService?: ArtifactResolutionService
  singleLogoutService?: Service[]
  nameIDFormat?: string[]
  singleSignOnService: Service[]
}

export interface ArtifactResolutionService {
  binding: string
  location: string
  index: string
}

export interface IDPSSODescriptorExtensions {
  scope: Scope
}

export interface Organization {
  organizationName: OrganizationName
  organizationDisplayName: OrganizationName
  organizationURL: OrganizationURL
}

export interface OrganizationName {
  lang: string
  text: string
}

export interface OrganizationURL {
  lang: string
  text: string
}
