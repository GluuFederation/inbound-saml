import nock from 'nock'
import config from '../../config/env'
import { mockTokenEndpoint } from './mockTokenEndpoint.mock'

/**
 *
 * @param endpoint endpoint without first slash
 * @param responseData
 */
export const mockUmaEndpoint = (
  endpoint: string,
  responseData: object
): void => {
  mockTokenEndpoint()
  const unauthorizedResponseHeaders = {
    'WWW-Authenticate':
      'UMA realm="Authorization required", host_id=apitest.techno24x7.com, as_uri=https://apitest.techno24x7.com/.well-known/uma2-configuration, ticket=e72ae32f-ad6d-458d-bf18-d34cd5081fb3'
  }
  const mockedBasePath = `https://${config.oxTrustApi.host}/${config.oxTrustApi.completePath}`

  nock(mockedBasePath)
    .get(`/${endpoint}`)
    .reply(401, {}, unauthorizedResponseHeaders)
  nock(mockedBasePath).get(`/${endpoint}`).reply(200, responseData)
}
