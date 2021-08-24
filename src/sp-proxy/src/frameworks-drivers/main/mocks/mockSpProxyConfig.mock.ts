import { SpProxyConfigProps } from '@sp-proxy/entities/protocols/SpProxyConfigProps'
import { SpProxyConfig } from '@sp-proxy/entities/SpProxyConfig'
import * as configRepo from '@sp-proxy/interface-adapters/data/FileReadProxyConfig'
jest.mock('@sp-proxy/interface-adapters/data/FileReadProxyConfig')

/**
 * mocked configuration props
 * props used to mock configuration instance
 */
export const mockedConfigProps: SpProxyConfigProps = {
  host: 'myhost.com',
  requestedIdentifierFormat: 'my:name:identifier:requested',
  authnContextIdentifierFormat: 'my:authn:name:identifier:format',
  skipRequestCompression: true,
  decryption: {
    publicCertPath: process.cwd() + '/src/testdata/cert.pem',
    privateKeyPath: process.cwd() + '/src/testdata/key.pem'
  },
  signing: {
    publicCertPath: process.cwd() + '/src/testdata/cert.pem',
    privateKeyPath: process.cwd() + '/src/testdata/key.pem'
  }
}

/**
 * Mocks 'FileReadProxyConfig' to return static test values
 */
export const mockSpProxyConfig = (): void => {
  const mockedConfig: SpProxyConfig = new SpProxyConfig(mockedConfigProps)
  jest
    .spyOn(configRepo.FileReadProxyConfig.prototype, 'read')
    .mockResolvedValue(mockedConfig)
}
