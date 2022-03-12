import { makeGetTrByHostComposite } from '@sp-proxy/interface-adapters/api/factories/makeGetTrByHostComposite'
import { GetTrByHostFacade } from '@sp-proxy/interface-adapters/api/GetTrByHostFacade'
import { InvalidRequestError } from '@sp-proxy/interface-adapters/delivery/errors/InvalidRequestError'
import nock from 'nock'
import { EventEmitter } from 'stream'
import { mockTokenEndpoint } from '../data/mocks/mockTokenEndpoint.mock'
import { mockUmaEndpoint } from '../data/mocks/mockUmaEndpoint.mock'
import { TrustRelationDataModel } from '../data/models/TrustRelationDataModel'
import { IGetTrByHostResponse } from '../delivery/dtos/IGetTrByHostResponse'

const trustedIdpsEndpoint = 'trusted-idps/valid.host.com'

const mockedResponseData: TrustRelationDataModel = {
  remoteIdp: {
    name: 'valid name',
    host: 'valid host',
    supportedSingleSignOnServices: [
      { binding: 'valid binding', location: 'valid location' }
    ],
    signingCertificates: ['cert1', 'cert2'],
    id: 'valid id'
  },
  selectedSingleSignOnService: {
    binding: 'any binding',
    location: 'https://valid.host.com/any-path'
  }
}

describe('GetTrByHostFacade - integration', () => {
  beforeAll(async () => {
    mockTokenEndpoint()
    mockUmaEndpoint(trustedIdpsEndpoint, mockedResponseData)
    // const urlInstance = new URL(config.oxTrustApi.tokenUrl)
    // const fullFromInstance = `${urlInstance.origin}${urlInstance.pathname}`
    // expect(fullFromInstance).toEqual(config.oxTrustApi.tokenUrl)

    // nock(mockedBasePath)
    //   .get(`/${trustedIdpsEndpoint}`)
    //   .reply(401, {}, unauthorizedUmaResponse.headers)
    // nock(mockedBasePath)
    //   .get(`/${trustedIdpsEndpoint}`)
    //   .reply(200, mockedResponseData)
  })
  afterAll(async () => {
    nock.cleanAll()
  })
  it('should return expected trust relation props', async () => {
    const eventBus = new EventEmitter()
    const controller = makeGetTrByHostComposite(eventBus)

    const sut = new GetTrByHostFacade(controller, eventBus)
    const expected: IGetTrByHostResponse = {
      id: mockedResponseData.remoteIdp.id,
      selectedSsoService: mockedResponseData.selectedSingleSignOnService,
      remoteIdp: {
        id: mockedResponseData.remoteIdp.id,
        name: mockedResponseData.remoteIdp.name,
        host: mockedResponseData.remoteIdp.host,
        singleSignOnService:
          mockedResponseData.remoteIdp.supportedSingleSignOnServices,
        signingCertificates: mockedResponseData.remoteIdp.signingCertificates
      }
    }
    const response = await sut.getTrByHost('valid.host.com')
    expect(response.remoteIdp).toEqual(expected.remoteIdp)
    expect(response.selectedSsoService).toEqual(expected.selectedSsoService)
  })
  it('should throw for unexistant host', async () => {
    const eventBus = new EventEmitter()
    const controller = makeGetTrByHostComposite(eventBus)
    const sut = new GetTrByHostFacade(controller, eventBus)
    await expect(sut.getTrByHost('notexistant.co.uk')).rejects.toThrow()
  })
  it('should throw InvalidRequestError for invalid host', async () => {
    const eventBus = new EventEmitter()
    const controller = makeGetTrByHostComposite(eventBus)
    const sut = new GetTrByHostFacade(controller, eventBus)
    await expect(sut.getTrByHost('')).rejects.toThrow(InvalidRequestError)
  })
})
