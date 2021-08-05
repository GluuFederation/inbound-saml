export interface IFetchedSingleSignOnServices {
  binding: string
  location: string
}

/**
 * data to be returned by api facade
 */
export interface IFetchedData {
  idpSigningCert: string[]
  singleSignOnServices: IFetchedSingleSignOnServices[]
}
