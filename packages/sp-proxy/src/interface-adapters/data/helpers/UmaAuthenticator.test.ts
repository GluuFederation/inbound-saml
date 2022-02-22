// ensure it does not throw when 401
import { readFileSync } from 'fs'
import nock from 'nock'
import { IOxTrustApiSettings } from '../protocols/IOxTrustApiSettings'
import { JwtSigner } from './JwtSigner'
import { TokenRequestFactory } from './TokenRequestFactory'
import { UmaAuthenticator } from './UmaAuthenticator'
import { UmaHeaderParser } from './UmaHeaderParser'

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
const testPrivateKey = readFileSync('packages/testdata/rs256pvk.pem', 'utf-8')

const makeOxTrustApiSettings = (): IOxTrustApiSettings => {
  return {
    clientId: 'valid client id',
    tokenUrl: 'https://mock.com/valid/token-endpoint',
    kid: 'a valid kid',
    pvkOrSecret: testPrivateKey
  }
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
      sut.authenticate('https://mock.com' + unauthorizedEndpoint)
    ).resolves.not.toThrow()
  })
})
