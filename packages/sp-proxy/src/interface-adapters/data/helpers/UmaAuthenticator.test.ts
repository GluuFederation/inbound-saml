// ensure it does not throw when 401
import nock from 'nock'
import { IOxTrustApiSettings } from '../protocols/IOxTrustApiSettings'
import { JwtSigner } from './JwtSigner'
import { TokenRequestFactory } from './TokenRequestFactory'
import { UmaAuthenticator } from './UmaAuthenticator'
import { UmaHeaderParser } from './UmaHeaderParser'
// request to a valid endpoint
// receive 401 and ticket #
// create client assertion
// create uma token request
// retrieve token

const unauthorizedEndpoint = '/valid/endpoint'
const tokenEndpoint = '/valid/token-endpoint'

const mockUnauthorizedEndpoint = (): void => {
  nock('https://mock.com').get(unauthorizedEndpoint).reply(
    401,
    {},
    {
      'WWW-Authenticate':
        'UMA realm="Authorization required", host_id=apitest.techno24x7.com, as_uri=https://apitest.techno24x7.com/.well-known/uma2-configuration, ticket=e72ae32f-ad6d-458d-bf18-d34cd5081fb3'
    }
  )
}

const mockTokenEndpoint = (): void => {
  nock('https://mock.com').post(tokenEndpoint).reply(200)
}

const testPvkPath = 'packages/testdata/rs256pvk.pem'

const makeOxTrustApiSettings = (): IOxTrustApiSettings => {
  const settings: IOxTrustApiSettings = {
    host: 'mock.com',
    clientId: 'any client id',
    completePath: 'valid-complete-path',
    tokenUrl: 'https://mock.com/valid/token-endpoint',
    kid: 'valid-kid',
    pvkPath: testPvkPath
  }
  return settings
}

const sut = new UmaAuthenticator(
  new UmaHeaderParser(),
  new JwtSigner(),
  makeOxTrustApiSettings(),
  new TokenRequestFactory()
)

describe('UmaAuthenticator', () => {
  it('should not throw when response is 401', async () => {
    mockUnauthorizedEndpoint()
    mockTokenEndpoint()
    await expect(
      sut.authenticate('https://mock.com' + unauthorizedEndpoint, 'GET')
    ).resolves.not.toThrow()
  })
})
