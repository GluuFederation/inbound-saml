import { WinstonLogger } from '@sp-proxy/frameworks-drivers/main/logger/WinstonLogger'
import { AddTrFromMetadataFacade } from '@sp-proxy/interface-adapters/api/AddTrFromMetadataFacade'
import { GetSamlFetchExternalData } from '@sp-proxy/interface-adapters/data/GetSamlFetchExternalData'
import { AddTrFromMetadataController } from '@sp-proxy/interface-adapters/delivery/AddTrFromMetadataController'
import { AddTrFromMetadataPresenter } from '@sp-proxy/interface-adapters/delivery/AddTrFromMetadataPresenter'
import { AddTrFromMetadataControllerMapper } from '@sp-proxy/interface-adapters/delivery/mappers/AddTrFromMetadataControllerMapper'
import { AddTrFromMetadataPresenterMapper } from '@sp-proxy/interface-adapters/delivery/mappers/AddTrFromMetadataPresenterMapper'
import { AddTrFromMetadataValidator } from '@sp-proxy/interface-adapters/delivery/validators/AddTrFromMetadataValidator'
import { mockXmlEndpoints } from '@sp-proxy/interface-adapters/mocks/xmlEndpoints.mock'
import { AddTrFromMetadataInteractor } from '@sp-proxy/use-cases/AddTrFromMetadataInteractor'
import { RemoteIdpFromExternalDataFactory } from '@sp-proxy/use-cases/factories/RemoteIdpFromExternalDataFactory'
import { TrustRelationWithDefaultFactory } from '@sp-proxy/use-cases/factories/TrustRelationWithDefaultFactory'
import nock from 'nock'
import { EventEmitter } from 'stream'
import config from '../config/env'
import { LogAddTrGatewayDecorator } from '../data/decorators/LogAddTrGatewayDecorator'
import { JwtSigner } from '../data/helpers/JwtSigner'
import { TokenRequestFactory } from '../data/helpers/TokenRequestFactory'
import { UmaAuthenticator } from '../data/helpers/UmaAuthenticator'
import { UmaHeaderParser } from '../data/helpers/UmaHeaderParser'
import { AddTrustRelationOxTrustMapper } from '../data/mappers/AddTrustRelationOxTrustMapper'
import { mockPostUmaEndpoint } from '../data/mocks/mockUmaEndpoint.mock'
import { OxTrustAddTrustRelation } from '../data/OxTrustAddTrustRelation'

describe('AddTrFromMetadataFacade - integration', () => {
  beforeAll(async () => {
    mockXmlEndpoints()
    mockPostUmaEndpoint('trusted-idp', {})
  })
  afterAll(async () => {
    nock.cleanAll()
  })
  it('should return success message', async () => {
    const eventBus = new EventEmitter()
    const presenterMapper = new AddTrFromMetadataPresenterMapper()
    const presenter = new AddTrFromMetadataPresenter(presenterMapper, eventBus)

    const externalDataGateway = new GetSamlFetchExternalData()
    const remoteIdpFromExtDataFactory = new RemoteIdpFromExternalDataFactory()
    const trWithDefaultFactory = new TrustRelationWithDefaultFactory()
    const dataMapper = new AddTrustRelationOxTrustMapper()
    const umaAuthenticator = new UmaAuthenticator(
      new UmaHeaderParser(),
      new JwtSigner(),
      config.oxTrustApi,
      new TokenRequestFactory()
    )
    const oxTrustAddTrGateway = new OxTrustAddTrustRelation(
      config.oxTrustApi,
      dataMapper,
      umaAuthenticator
    )
    const addTrGateway = new LogAddTrGatewayDecorator(
      WinstonLogger.getInstance(),
      oxTrustAddTrGateway
    )
    const interactor = new AddTrFromMetadataInteractor(
      externalDataGateway,
      remoteIdpFromExtDataFactory,
      trWithDefaultFactory,
      addTrGateway,
      presenter
    )

    const controllerMapper = new AddTrFromMetadataControllerMapper()
    const controllerValidator = new AddTrFromMetadataValidator()
    const controller = new AddTrFromMetadataController(
      controllerMapper,
      interactor,
      controllerValidator
    )
    const sut = new AddTrFromMetadataFacade(controller, eventBus)
    const result = await sut.addTrFromMetadata({
      name: 'tr name',
      host: 'tr host',
      url: 'https://remoteIdp.com/metadata'
    })
    expect(result).toStrictEqual({ success: true })
  })
})
