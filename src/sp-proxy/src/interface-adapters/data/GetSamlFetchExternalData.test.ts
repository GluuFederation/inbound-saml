import { GetSamlFetchExternalData } from '@sp-proxy/interface-adapters/data/GetSamlFetchExternalData'
import { mockXmlEndpoints } from '@sp-proxy/interface-adapters/data/mocks/xmlEndpoints.mock'
import { IExternalDataModel } from '@sp-proxy/use-cases/io-models/IExternalDataModel'

/**
 * Expected data from testfile used in this test
 */
const expectedData: IExternalDataModel = {
  idpSigningCert: [
    'MIIDjTCCAnUCFEfrDgg5EbuYxdqMKep1Dy6l9tfmMA0GCSqGSIb3DQEBCwUAMIGC\n' +
      'MQswCQYDVQQGEwJCUjELMAkGA1UECAwCU1AxEjAQBgNVBAcMCVNhbyBQYXVsbzET\n' +
      'MBEGA1UECgwKU2luZ2xlTWV0YTEeMBwGA1UEAwwVcG9jaWRwLnRlY2hubzI0eDcu\n' +
      'Y29tMR0wGwYJKoZIhvcNAQkBFg5jaHJpc0BnbHV1Lm9yZzAeFw0yMTA2MjQxNzMx\n' +
      'MDJaFw0yMjA2MjQxNzMxMDJaMIGCMQswCQYDVQQGEwJCUjELMAkGA1UECAwCU1Ax\n' +
      'EjAQBgNVBAcMCVNhbyBQYXVsbzETMBEGA1UECgwKU2luZ2xlTWV0YTEeMBwGA1UE\n' +
      'AwwVcG9jaWRwLnRlY2hubzI0eDcuY29tMR0wGwYJKoZIhvcNAQkBFg5jaHJpc0Bn\n' +
      'bHV1Lm9yZzCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALGNOi4d5sbO\n' +
      'IaqmJY7VLuLODs2bO1VvGN8AydqVL1TR2ibB1ZmkTZCBQAulh3iiW+NwHYpPVzoO\n' +
      'kEmCH7qT+BvqQ0LuAWwb88+a7G4t69PwVkO1oE8sxApuQ0qh7TQ0eRhn1jhROff1\n' +
      'M+SOvDYeJXezMLPyDSlgzzt9oEymb3spoV7LlyPfDXhfGIrGDWsrGFTAMC5wAlyM\n' +
      'ji3Cv+rjSNdJSFQQ07mYIGAiV9jmIDwe47amTvmMQZTXCOQlgJnjivalUfRkZnhY\n' +
      'nBeS4tkkuQu/ZQqM5EOaX4hyZkYMImjpWq1Era4UmMht1y+zPLwIyGjoBMRvG/Iz\n' +
      'nx6PWMQeTacCAwEAATANBgkqhkiG9w0BAQsFAAOCAQEAGuxFRGUxlOJ1EdgJSidl\n' +
      'DbGY/LpuGoeQHmBk3gFhug8FMKjeY2MU+RfpCzxoR1sF2wsshagcSMYs7D6ApWFc\n' +
      'g+RqpTJ6B3CP5rANx2+MwXDs8lEf0yrswlDmCVXTK8g5CwYtARqHPM9kv0gFUkSf\n' +
      'SobRvkTRGPzYwhvmPNpTWKtZtPF/rNam8Y3l56jEeMFJjLLtz/3Q7/ofH94rsDFF\n' +
      'gslzQrk0ETEftKsgV1g0s9/icPzgH9cYK+J2E/ADoC0j2XCk8TegMglUvJ34DsJU\n' +
      'rL/sYIs/Z7A5nnrVMiTx7wAGDl1w6so7rK+h/TkIrORwOyXWyO1LIHD5+yMkv1AR\n' +
      'ew=='
  ],
  singleSignOnServices: [
    {
      binding: 'urn:mace:shibboleth:2.0:profiles:AuthnRequest',
      location:
        'https://pocidp.techno24x7.com/idp/profile/SAML2/Unsolicited/SSO'
    },
    {
      binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
      location: 'https://pocidp.techno24x7.com/idp/profile/SAML2/POST/SSO'
    },
    {
      binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST-SimpleSign',
      location:
        'https://pocidp.techno24x7.com/idp/profile/SAML2/POST-SimpleSign/SSO'
    },
    {
      binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect',
      location: 'https://pocidp.techno24x7.com/idp/profile/SAML2/Redirect/SSO'
    }
  ]
}

describe('GetSamlFetchExternalData - integration', () => {
  beforeAll(async () => {
    mockXmlEndpoints()
  })
  it('should return expected object', async () => {
    const sut = new GetSamlFetchExternalData()
    expect(await sut.fetch('https://remoteIdp.com/metadata')).toStrictEqual(
      expectedData
    )
  })
})
