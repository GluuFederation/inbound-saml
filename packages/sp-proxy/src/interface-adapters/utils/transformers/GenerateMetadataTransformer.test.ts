import { SpProxyConfigProps } from '@sp-proxy/entities/protocols/SpProxyConfigProps'
import { KeyCertLoader } from '@sp-proxy/interface-adapters/external-services/KeyCertLoader'
import { IKeyCertLoader } from '@sp-proxy/use-cases/protocols/IKeyCertLoader'
import { GenerateMetadataFormatter } from '@sp-proxy/interface-adapters/utils/formatters/GenerateMetadataFormatter'
import { GenerateMetadataTransformer } from '@sp-proxy/interface-adapters/utils/transformers/GenerateMetadataTransformer'
import { IMetadataGeneratorParams } from '@sp-proxy/use-cases/ports/IMetadataGenerator'
import { IKeyCertFormatter } from '@sp-proxy/use-cases/protocols/IKeySetFormatter'
import { readFileSync } from 'fs'

const makeLoader = (): IKeyCertLoader => {
  return new KeyCertLoader()
}

const makeFormatter = (): IKeyCertFormatter => {
  return new GenerateMetadataFormatter()
}

interface SutTypes {
  sut: GenerateMetadataTransformer
  loaderStub: IKeyCertLoader
  formatterStub: IKeyCertFormatter
}

const makeSut = (): SutTypes => {
  const loaderStub = makeLoader()
  const formatterStub = makeFormatter()
  const sut = new GenerateMetadataTransformer(loaderStub, formatterStub)
  return {
    sut,
    loaderStub,
    formatterStub
  }
}

const fakeConfigProps: SpProxyConfigProps = {
  host: 'myhost.name',
  requestedIdentifierFormat: 'valid:reqyested:identifier:format',
  authnContextIdentifierFormat: 'valid:authnContext:identifier:format',
  skipRequestCompression: false,
  decryption: {
    publicCertPath: process.cwd() + '/packages/testdata/decryptionCert.pem',
    privateKeyPath: process.cwd() + '/packages/testdata/decryptionPvk.key'
  },
  signing: {
    publicCertPath: process.cwd() + '/packages/testdata/cert.pem',
    privateKeyPath: process.cwd() + '/packages/testdata/key.pem'
  },
  postProfileUrl: 'https://valid.url/path'
}

const expectedResponse: IMetadataGeneratorParams = {
  callbackUrl: 'https://myhost.name/inbound-saml/sp/callback',
  requestedIdentifierFormat: 'valid:reqyested:identifier:format',
  authnContextIdentifierFormat: 'valid:authnContext:identifier:format',
  skipRequestCompression: false,
  decryption: {
    publicCert: readFileSync(
      fakeConfigProps.decryption.publicCertPath
    ).toString(),
    privateKey: readFileSync(
      fakeConfigProps.decryption.privateKeyPath
    ).toString()
  },
  signing: {
    publicCert:
      'MIIFFjCCAv4CCQDFhyLx2QM/TTANBgkqhkiG9w0BAQsFADBNMQswCQYDVQQGEwJCUjELMAkGA1UECAwCU1AxCzAJBgNVBAcMAlNQMQ0wCwYDVQQKDARHbHV1MRUwEwYDVQQLDAxpbmJvdW5kLXNhbWwwHhcNMjEwODIzMTczNzM3WhcNMjIwODIzMTczNzM3WjBNMQswCQYDVQQGEwJCUjELMAkGA1UECAwCU1AxCzAJBgNVBAcMAlNQMQ0wCwYDVQQKDARHbHV1MRUwEwYDVQQLDAxpbmJvdW5kLXNhbWwwggIiMA0GCSqGSIb3DQEBAQUAA4ICDwAwggIKAoICAQDLk1dGOl7vIVAEavkpq8VXaFk0+9KT6DHE8ZNLAr2lKcYrJzMrU1EPWQHlhX6Wm8t6R6pvUi1N3SHRAmN50rcFyQLgU+Scq8OI0H0nt5+irR8MuQLadTaVhwyNJFV/1LKg6HvaMf3QejWQnNaYOY0USciBvhYqFj8f134AKGJR0jtIF6wtrsyW0u6F1/cGvjEufUhSAw+oQZNSfuYR8gSJImtcKz+Eq6cXZYQrXdhebMhr7A15Attlq95aL+QCef54IfvXf2yJtXhfxd734O1Tvzo9/2Vq8G7D854XQL6zYfZcaWdqAWy+sWuBRt7zDWFx49Y8TrCmetCESwN0limx0Mav6bXI/CAISN43RvBfbwyme5pekyB++refeq41+20VqxzoL8z+AhriUiqby0chmFEPTP3IdM+DGRh+pcoUQEchCFlGDr3zI4mKiRO1un5eguJKHLMWxyTs4b7SPIpdMuNiasUIP1KQYJSLdb8vxpXnrcSuZjjtritz4e4B5QoERQuBNUOwNUsj/O3yzWajZDPGPrzMbRxzo4RxobmkxbZNX0HgajGi9OMyYZMIb0eT/6Wi7fRUgN7kCYX0eYRU8F2HzfoTWWfqJIDZJHwvpfzMN4KtDtp7QYkOkTl+JEJjsD7pQC91uo7Xt0OVTdAz16M7WkgTVenI9NX/l8DYKwIDAQABMA0GCSqGSIb3DQEBCwUAA4ICAQA2vWeeBqDXK5ZMS6xTMKYArLgSBUJ57BxOjOIvzV/egZXFj979ATYMGWOCB4iyzKWLVufTZGupWtscLBi/M2W39wFd8nduKfBbF2/jReS1p8p5Np87AqPYDTYoImZ3dK9Q/YtGHCj0O/mvvJNuP5TJvv/rvTrz7opBY3n4wy3Bhu+63oX0PRW+Pt9Q8TXv7VGMi9QILYMPe4TM+6UhWWbJYwWJr8D/TIQC2t5qBCe/gob9oopgEijgwD075i60U7NlyDKSdXvqmDtIpnUgxEYh0/jVK5Mp3gaPcank58q+4VQRsJvzs96gcnKZDbHRxE9QMiKTlnPGfUWXE0LrEhVsw8bQMSOsIxE7O6AdTBZcEUYtMEhVsIrQqt0ZnYAGT+1llPLJKYuScI5AvfhBCpAfsSMq4ZPc0Arb9ulGEo8bkYcYAFtXkbOk5m7vEMsPLxtvXXnhjiag9RvGiDuOiO5GjLWdKAPcAGILnMw755rm2ow7998swevDhZ9YQ3yrDC7xMY2p/f/UGhqSlH6eOT/Amy5SjehQAHRZpBYzwcuw2eayTytFPepRRd/wKLE5RjbCB6To7mb7Ip3GCMDNGkXx6Nwlrr3/aL/kkbUEwl6+Ox10BnmQT0xVXfj9DupRGZhJnqgVPLHUxuX7ZkoLjU9nxADUZ6nNKIbQOQhACga3uQ==',
    privateKey:
      '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'
  }
}

describe('GenerateMetadataTransformer - integration', () => {
  it('should return correct values', async () => {
    const { sut } = makeSut()
    const result = await sut.transform(fakeConfigProps)
    expect(result).toEqual(expectedResponse)
  })
})
