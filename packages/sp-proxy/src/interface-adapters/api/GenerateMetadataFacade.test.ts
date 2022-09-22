import { SpProxyConfigProps } from '@sp-proxy/entities/protocols/SpProxyConfigProps'
import { SpProxyConfig } from '@sp-proxy/entities/SpProxyConfig'
import { GenerateMetadataFacade } from '@sp-proxy/interface-adapters/api/GenerateMetadataFacade'
import cfg from '@sp-proxy/interface-adapters/config/env'
import * as configRepo from '@sp-proxy/interface-adapters/data/FileReadProxyConfig'
import { GenerateMetadataController } from '@sp-proxy/interface-adapters/delivery/GenerateMetadataController'
import { GenerateMetadataPresenter } from '@sp-proxy/interface-adapters/delivery/GenerateMetadataPresenter'
import { GenerateMetadataControllerMapper } from '@sp-proxy/interface-adapters/delivery/mappers/GenerateMetadataControllerMapper'
import { GenerateMetadataPresenterMapper } from '@sp-proxy/interface-adapters/delivery/mappers/GenerateMetadataPresenterMapper'
import { KeyCertLoader } from '@sp-proxy/interface-adapters/external-services/KeyCertLoader'
import { MetadataGenerator } from '@sp-proxy/interface-adapters/external-services/MetadataGenerator'
import { GenerateMetadataFormatter } from '@sp-proxy/interface-adapters/utils/formatters/GenerateMetadataFormatter'
import { GenerateMetadataTransformer } from '@sp-proxy/interface-adapters/utils/transformers/GenerateMetadataTransformer'
import { GenerateSpMetadataInteractor } from '@sp-proxy/use-cases/GenerateMetadataInteractor'
import { GenerateMetadataUseCaseMapper } from '@sp-proxy/use-cases/mappers/GenerateMetadataUseCaseMapper'
import { EventEmitter } from 'stream'
jest.mock('@sp-proxy/interface-adapters/data/FileReadProxyConfig')
describe('GenerateMetadataFacade - integration', () => {
  beforeAll(async () => {
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
      },
      postProfileUrl: 'https://valid.url/path'
    }
    const mockedConfig: SpProxyConfig = new SpProxyConfig(mockedProps)
    jest
      .spyOn(configRepo.FileReadProxyConfig.prototype, 'read')
      .mockResolvedValueOnce(mockedConfig)

    cfg.database.file.proxyConfigPath =
      process.cwd() + '/packages/testdata/sp-proxy-config-test.json'
  })
  it('should return metadata', async () => {
    const eventBus = new EventEmitter()
    const presenterMapper = new GenerateMetadataPresenterMapper()
    const presenter = new GenerateMetadataPresenter(presenterMapper, eventBus)

    const fileReadProxyConfig = new configRepo.FileReadProxyConfig()

    const keyCertLoader = new KeyCertLoader()
    const formatter = new GenerateMetadataFormatter()
    const paramsTransformer = new GenerateMetadataTransformer(
      keyCertLoader,
      formatter
    )

    const externalMetadataGenerator = new MetadataGenerator()
    const useCaseMapper = new GenerateMetadataUseCaseMapper()
    const interactor = new GenerateSpMetadataInteractor(
      fileReadProxyConfig,
      paramsTransformer,
      externalMetadataGenerator,
      useCaseMapper,
      presenter
    )

    const controllerMapper = new GenerateMetadataControllerMapper()

    const controller = new GenerateMetadataController(
      controllerMapper,
      interactor
    )

    const sut = new GenerateMetadataFacade(controller, eventBus)
    const response = await sut.generateMetadata()
    expect(response.metadata).toContain(
      '<ds:X509Certificate>MIIFFjCCAv4CCQDFhyLx2QM/TTANBgkqhkiG9w0BAQsFADBNMQswCQYDVQQGEwJC'
    )
    expect(response.metadata).toContain('KeyDescriptor use="encryption"')
    expect(response.metadata).toContain('KeyDescriptor use="signing"')
    expect(response.metadata).toContain('my:name:identifier:requested')
  })
})
