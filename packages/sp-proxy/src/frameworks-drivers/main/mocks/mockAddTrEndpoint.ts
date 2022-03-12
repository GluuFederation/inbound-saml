import config from '@sp-proxy/interface-adapters/config/env'
import nock from 'nock'

export const mockAddTrEndpoint = (): void => {
  nock(`https://${config.oxTrustApi.host}`)
    .post(`/${config.oxTrustApi.completePath}/trusted-idp`)
    .reply(201, 'created')
    .persist()
}
