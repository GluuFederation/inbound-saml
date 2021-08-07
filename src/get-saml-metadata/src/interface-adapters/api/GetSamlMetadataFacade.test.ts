import { makeGetComposite } from '@get-saml-metadata/interface-adapters/api/factories/makeGetComposite'
import { GetSamlMetadataFacade } from '@get-saml-metadata/interface-adapters/api/GetSamlMetadataFacade'
import { SourceType } from '@get-saml-metadata/interface-adapters/delivery/protocols/IGetExternalDataRequest'
import { IGetter } from '@get-saml-metadata/interface-adapters/delivery/protocols/IGetter'
import { EventEmitter } from 'stream'
import {
  mockGetUrlEndpoints,
  endpoints
} from '../../../../testdata/mocks/MetadataEndpointMocks'

export const validFilePath = process.cwd() + '/src/testdata/idp2certs.xml'

const makeSut = (source: SourceType): IGetter => {
  const eventBus = new EventEmitter()
  const controller = makeGetComposite(source, eventBus)
  return new GetSamlMetadataFacade(eventBus, controller)
}

describe('getFromFile', () => {
  it('should return correct values', async () => {
    const api = makeSut('file')
    const result = await api.get(validFilePath)
    const expected = {
      idpSigningCert: [
        'MIIDETCCAfmgAwIBAgIUZRpDhkNKl5eWtJqk0Bu1BgTTargwDQYJKoZIhvcNAQEL\nBQAwFjEUMBIGA1UEAwwLc2FtbHRlc3QuaWQwHhcNMTgwODI0MjExNDEwWhcNMzgw\nODI0MjExNDEwWjAWMRQwEgYDVQQDDAtzYW1sdGVzdC5pZDCCASIwDQYJKoZIhvcN\nAQEBBQADggEPADCCAQoCggEBAJrh9/PcDsiv3UeL8Iv9rf4WfLPxuOm9W6aCntEA\n8l6c1LQ1Zyrz+Xa/40ZgP29ENf3oKKbPCzDcc6zooHMji2fBmgXp6Li3fQUzu7yd\n+nIC2teejijVtrNLjn1WUTwmqjLtuzrKC/ePoZyIRjpoUxyEMJopAd4dJmAcCq/K\nk2eYX9GYRlqvIjLFoGNgy2R4dWwAKwljyh6pdnPUgyO/WjRDrqUBRFrLQJorR2kD\nc4seZUbmpZZfp4MjmWMDgyGM1ZnR0XvNLtYeWAyt0KkSvFoOMjZUeVK/4xR74F8e\n8ToPqLmZEg9ZUx+4z2KjVK00LpdRkH9Uxhh03RQ0FabHW6UCAwEAAaNXMFUwHQYD\nVR0OBBYEFJDbe6uSmYQScxpVJhmt7PsCG4IeMDQGA1UdEQQtMCuCC3NhbWx0ZXN0\nLmlkhhxodHRwczovL3NhbWx0ZXN0LmlkL3NhbWwvaWRwMA0GCSqGSIb3DQEBCwUA\nA4IBAQBNcF3zkw/g51q26uxgyuy4gQwnSr01Mhvix3Dj/Gak4tc4XwvxUdLQq+jC\ncxr2Pie96klWhY/v/JiHDU2FJo9/VWxmc/YOk83whvNd7mWaNMUsX3xGv6AlZtCO\nL3JhCpHjiN+kBcMgS5jrtGgV1Lz3/1zpGxykdvS0B4sPnFOcaCwHe2B9SOCWbDAN\nJXpTjz1DmJO4ImyWPJpN1xsYKtm67Pefxmn0ax0uE2uuzq25h0xbTkqIQgJzyoE/\nDPkBFK1vDkMfAW11dQ0BXatEnW7Gtkc0lh2/PIbHWj4AzxYMyBf5Gy6HSVOftwjC\nvoQR2qr2xJBixsg+MIORKtmKHLfU',
        'MIIDEjCCAfqgAwIBAgIVAMECQ1tjghafm5OxWDh9hwZfxthWMA0GCSqGSIb3DQEB\nCwUAMBYxFDASBgNVBAMMC3NhbWx0ZXN0LmlkMB4XDTE4MDgyNDIxMTQwOVoXDTM4\nMDgyNDIxMTQwOVowFjEUMBIGA1UEAwwLc2FtbHRlc3QuaWQwggEiMA0GCSqGSIb3\nDQEBAQUAA4IBDwAwggEKAoIBAQC0Z4QX1NFKs71ufbQwoQoW7qkNAJRIANGA4iM0\nThYghul3pC+FwrGv37aTxWXfA1UG9njKbbDreiDAZKngCgyjxj0uJ4lArgkr4AOE\njj5zXA81uGHARfUBctvQcsZpBIxDOvUUImAl+3NqLgMGF2fktxMG7kX3GEVNc1kl\nbN3dfYsaw5dUrw25DheL9np7G/+28GwHPvLb4aptOiONbCaVvh9UMHEA9F7c0zfF\n/cL5fOpdVa54wTI0u12CsFKt78h6lEGG5jUs/qX9clZncJM7EFkN3imPPy+0HC8n\nspXiH/MZW8o2cqWRkrw3MzBZW3Ojk5nQj40V6NUbjb7kfejzAgMBAAGjVzBVMB0G\nA1UdDgQWBBQT6Y9J3Tw/hOGc8PNV7JEE4k2ZNTA0BgNVHREELTArggtzYW1sdGVz\ndC5pZIYcaHR0cHM6Ly9zYW1sdGVzdC5pZC9zYW1sL2lkcDANBgkqhkiG9w0BAQsF\nAAOCAQEASk3guKfTkVhEaIVvxEPNR2w3vWt3fwmwJCccW98XXLWgNbu3YaMb2RSn\n7Th4p3h+mfyk2don6au7Uyzc1Jd39RNv80TG5iQoxfCgphy1FYmmdaSfO8wvDtHT\nTNiLArAxOYtzfYbzb5QrNNH/gQEN8RJaEf/g/1GTw9x/103dSMK0RXtl+fRs2nbl\nD1JJKSQ3AdhxK/weP3aUPtLxVVJ9wMOQOfcy02l+hHMb6uAjsPOpOVKqi3M8XmcU\nZOpx4swtgGdeoSpeRyrtMvRwdcciNBp9UZome44qZAYH1iqrpmmjsfI9pJItsgWu\n3kXPjhSfj1AJGR1l9JGvJrHki1iHTA=='
      ],
      singleSignOnServices: [
        {
          binding: 'urn:mace:shibboleth:1.0:profiles:AuthnRequest',
          location: 'https://samltest.id/idp/profile/Shibboleth/SSO'
        },
        {
          binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
          location: 'https://samltest.id/idp/profile/SAML2/POST/SSO'
        },
        {
          binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST-SimpleSign',
          location: 'https://samltest.id/idp/profile/SAML2/POST-SimpleSign/SSO'
        },
        {
          binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect',
          location: 'https://samltest.id/idp/profile/SAML2/Redirect/SSO'
        },
        {
          binding: 'urn:oasis:names:tc:SAML:2.0:bindings:SOAP',
          location: 'https://samltest.id/idp/profile/SAML2/SOAP/ECP'
        }
      ]
    }
    expect(result).toStrictEqual(expected)
  })
  it('return value should have IFetchedData keys', async () => {
    const api = makeSut('file')
    const result = await api.get(validFilePath)
    expect(result).toEqual({
      idpSigningCert: expect.anything(),
      singleSignOnServices: expect.anything()
    })
  })
})
describe('getFromUrl', () => {
  const validUrl = endpoints.valid
  it('should return correct values', async () => {
    mockGetUrlEndpoints()
    const api = makeSut('url')
    const result = await api.get(validUrl)
    const expected = {
      idpSigningCert: [
        'MIIDETCCAfmgAwIBAgIUZRpDhkNKl5eWtJqk0Bu1BgTTargwDQYJKoZIhvcNAQEL\nBQAwFjEUMBIGA1UEAwwLc2FtbHRlc3QuaWQwHhcNMTgwODI0MjExNDEwWhcNMzgw\nODI0MjExNDEwWjAWMRQwEgYDVQQDDAtzYW1sdGVzdC5pZDCCASIwDQYJKoZIhvcN\nAQEBBQADggEPADCCAQoCggEBAJrh9/PcDsiv3UeL8Iv9rf4WfLPxuOm9W6aCntEA\n8l6c1LQ1Zyrz+Xa/40ZgP29ENf3oKKbPCzDcc6zooHMji2fBmgXp6Li3fQUzu7yd\n+nIC2teejijVtrNLjn1WUTwmqjLtuzrKC/ePoZyIRjpoUxyEMJopAd4dJmAcCq/K\nk2eYX9GYRlqvIjLFoGNgy2R4dWwAKwljyh6pdnPUgyO/WjRDrqUBRFrLQJorR2kD\nc4seZUbmpZZfp4MjmWMDgyGM1ZnR0XvNLtYeWAyt0KkSvFoOMjZUeVK/4xR74F8e\n8ToPqLmZEg9ZUx+4z2KjVK00LpdRkH9Uxhh03RQ0FabHW6UCAwEAAaNXMFUwHQYD\nVR0OBBYEFJDbe6uSmYQScxpVJhmt7PsCG4IeMDQGA1UdEQQtMCuCC3NhbWx0ZXN0\nLmlkhhxodHRwczovL3NhbWx0ZXN0LmlkL3NhbWwvaWRwMA0GCSqGSIb3DQEBCwUA\nA4IBAQBNcF3zkw/g51q26uxgyuy4gQwnSr01Mhvix3Dj/Gak4tc4XwvxUdLQq+jC\ncxr2Pie96klWhY/v/JiHDU2FJo9/VWxmc/YOk83whvNd7mWaNMUsX3xGv6AlZtCO\nL3JhCpHjiN+kBcMgS5jrtGgV1Lz3/1zpGxykdvS0B4sPnFOcaCwHe2B9SOCWbDAN\nJXpTjz1DmJO4ImyWPJpN1xsYKtm67Pefxmn0ax0uE2uuzq25h0xbTkqIQgJzyoE/\nDPkBFK1vDkMfAW11dQ0BXatEnW7Gtkc0lh2/PIbHWj4AzxYMyBf5Gy6HSVOftwjC\nvoQR2qr2xJBixsg+MIORKtmKHLfU',
        'MIIDEjCCAfqgAwIBAgIVAMECQ1tjghafm5OxWDh9hwZfxthWMA0GCSqGSIb3DQEB\nCwUAMBYxFDASBgNVBAMMC3NhbWx0ZXN0LmlkMB4XDTE4MDgyNDIxMTQwOVoXDTM4\nMDgyNDIxMTQwOVowFjEUMBIGA1UEAwwLc2FtbHRlc3QuaWQwggEiMA0GCSqGSIb3\nDQEBAQUAA4IBDwAwggEKAoIBAQC0Z4QX1NFKs71ufbQwoQoW7qkNAJRIANGA4iM0\nThYghul3pC+FwrGv37aTxWXfA1UG9njKbbDreiDAZKngCgyjxj0uJ4lArgkr4AOE\njj5zXA81uGHARfUBctvQcsZpBIxDOvUUImAl+3NqLgMGF2fktxMG7kX3GEVNc1kl\nbN3dfYsaw5dUrw25DheL9np7G/+28GwHPvLb4aptOiONbCaVvh9UMHEA9F7c0zfF\n/cL5fOpdVa54wTI0u12CsFKt78h6lEGG5jUs/qX9clZncJM7EFkN3imPPy+0HC8n\nspXiH/MZW8o2cqWRkrw3MzBZW3Ojk5nQj40V6NUbjb7kfejzAgMBAAGjVzBVMB0G\nA1UdDgQWBBQT6Y9J3Tw/hOGc8PNV7JEE4k2ZNTA0BgNVHREELTArggtzYW1sdGVz\ndC5pZIYcaHR0cHM6Ly9zYW1sdGVzdC5pZC9zYW1sL2lkcDANBgkqhkiG9w0BAQsF\nAAOCAQEASk3guKfTkVhEaIVvxEPNR2w3vWt3fwmwJCccW98XXLWgNbu3YaMb2RSn\n7Th4p3h+mfyk2don6au7Uyzc1Jd39RNv80TG5iQoxfCgphy1FYmmdaSfO8wvDtHT\nTNiLArAxOYtzfYbzb5QrNNH/gQEN8RJaEf/g/1GTw9x/103dSMK0RXtl+fRs2nbl\nD1JJKSQ3AdhxK/weP3aUPtLxVVJ9wMOQOfcy02l+hHMb6uAjsPOpOVKqi3M8XmcU\nZOpx4swtgGdeoSpeRyrtMvRwdcciNBp9UZome44qZAYH1iqrpmmjsfI9pJItsgWu\n3kXPjhSfj1AJGR1l9JGvJrHki1iHTA=='
      ],
      singleSignOnServices: [
        {
          binding: 'urn:mace:shibboleth:1.0:profiles:AuthnRequest',
          location: 'https://samltest.id/idp/profile/Shibboleth/SSO'
        },
        {
          binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
          location: 'https://samltest.id/idp/profile/SAML2/POST/SSO'
        },
        {
          binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST-SimpleSign',
          location: 'https://samltest.id/idp/profile/SAML2/POST-SimpleSign/SSO'
        },
        {
          binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect',
          location: 'https://samltest.id/idp/profile/SAML2/Redirect/SSO'
        },
        {
          binding: 'urn:oasis:names:tc:SAML:2.0:bindings:SOAP',
          location: 'https://samltest.id/idp/profile/SAML2/SOAP/ECP'
        }
      ]
    }
    expect(result).toStrictEqual(expected)
  })
  it('return value should have IFetchedData keys', async () => {
    const api = makeSut('url')
    const result = await api.get(validUrl)
    expect(result).toEqual({
      idpSigningCert: expect.anything(),
      singleSignOnServices: expect.anything()
    })
  })
})
