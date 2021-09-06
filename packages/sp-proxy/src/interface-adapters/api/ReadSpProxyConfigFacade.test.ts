import { SpProxyConfig } from '@sp-proxy/entities/SpProxyConfig'
import { ReadSpProxyConfigFacade } from '@sp-proxy/interface-adapters/api/ReadSpProxyConfigFacade'
import { FileReadProxyConfig } from '@sp-proxy/interface-adapters/data/FileReadProxyConfig'
import { ReadSpProxyConfigControllerMapper } from '@sp-proxy/interface-adapters/delivery/mappers/ReadSpProxyConfigControllerMapper'
import { ReadSpProxyConfigPresenterMapper } from '@sp-proxy/interface-adapters/delivery/mappers/ReadSpProxyConfigPresenterMapper'
import { ReadSpProxyConfigController } from '@sp-proxy/interface-adapters/delivery/ReadSpProxyConfigController'
import { ReadSpProxyConfigPresenter } from '@sp-proxy/interface-adapters/delivery/ReadSpProxyConfigPresenter'
import { KeyCertLoader } from '@sp-proxy/interface-adapters/external-services/KeyCertLoader'
import { ReadSpProxyConfigFormatter } from '@sp-proxy/interface-adapters/utils/formatters/ReadSpProxyConfigFormatter'
import { ReadSpProxyConfigTransformer } from '@sp-proxy/interface-adapters/utils/transformers/ReadSpProxyConfigTransformer'
import { ReadSpProxyConfigInteractor } from '@sp-proxy/use-cases/ReadSpProxyConfigInteractor'
import { EventEmitter } from 'stream'
import * as configRepo from '@sp-proxy/interface-adapters/data/FileReadProxyConfig'
import { SpProxyConfigProps } from '@sp-proxy/entities/protocols/SpProxyConfigProps'
import cfg from '@sp-proxy/interface-adapters/config/env'
import { readFileSync } from 'fs'
import { IReadSpProxyConfigResponse } from '@sp-proxy/interface-adapters/delivery/dtos/IReadSpProxyConfigResponse'
jest.mock('@sp-proxy/interface-adapters/data/FileReadProxyConfig')

const loadedCert = readFileSync(process.cwd() + '/packages/testdata/cert.pem')
  .toString()
  .replace(/(\r\n|\n|\r)/gm, '')
  .replace('-----BEGIN CERTIFICATE-----', '')
  .replace('-----END CERTIFICATE-----', '')
const loadedPvk = readFileSync(process.cwd() + '/packages/testdata/key.pem')
  .toString()
  .replace(/(\r\n|\n|\r)/gm, '')
  .replace('-----BEGIN ENCRYPTED PRIVATE KEY-----', '')
  .replace('-----END ENCRYPTED PRIVATE KEY-----', '')

const eventBus = new EventEmitter()
const presenterMapper = new ReadSpProxyConfigPresenterMapper()
const presenter = new ReadSpProxyConfigPresenter(presenterMapper, eventBus)

const gateway = new FileReadProxyConfig()
const loader = new KeyCertLoader()
const formatter = new ReadSpProxyConfigFormatter()
const transformer = new ReadSpProxyConfigTransformer(loader, formatter)
const interactor = new ReadSpProxyConfigInteractor(
  gateway,
  transformer,
  presenter
)

const controllerMapper = new ReadSpProxyConfigControllerMapper()
const controller = new ReadSpProxyConfigController(controllerMapper, interactor)

const sut = new ReadSpProxyConfigFacade(eventBus, controller)

describe('ReadSpProxyConfigFacade - integration', () => {
  const mockedProps: SpProxyConfigProps = {
    host: 'myhost.com',
    requestedIdentifierFormat: 'my:name:identifier:requested',
    authnContextIdentifierFormat: 'my:authn:name:identifier:format',
    skipRequestCompression: true,
    decryption: {
      publicCertPath: process.cwd() + '/packages/testdata/cert.pem',
      privateKeyPath: process.cwd() + '/packages/testdata/key.pem'
    },
    signing: {
      publicCertPath: process.cwd() + '/packages/testdata/cert.pem',
      privateKeyPath: process.cwd() + '/packages/testdata/key.pem'
    }
  }
  const mockedConfig: SpProxyConfig = new SpProxyConfig(mockedProps)

  beforeAll(async () => {
    jest
      .spyOn(configRepo.FileReadProxyConfig.prototype, 'read')
      .mockResolvedValueOnce(mockedConfig)

    cfg.database.file.proxyConfigPath =
      process.cwd() + '/packages/testdata/sp-proxy-config-test.json'
  })
  it('should return expected configuration props', async () => {
    const expected: IReadSpProxyConfigResponse = {
      host: mockedProps.host,
      requestedIdentifierFormat: mockedProps.requestedIdentifierFormat,
      authnContextIdentifierFormat: mockedProps.authnContextIdentifierFormat,
      skipRequestCompression: mockedProps.skipRequestCompression,
      decryption: {
        privateKey: loadedPvk,
        cert: loadedCert
      },
      signing: {
        privateKey: loadedPvk,
        cert: loadedCert
      }
    }
    expect(await sut.do()).toStrictEqual(expected)
  })
})
