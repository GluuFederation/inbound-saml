import config from '@sp-proxy/interface-adapters/config/env'
import nock from 'nock'

export const mockTokenEndpoint = (): void => {
  const tokenUrl = new URL(config.oxTrustApi.tokenUrl)
  nock(tokenUrl.origin)
    .post(`${tokenUrl.pathname}`, undefined, {
      encodedQueryParams: true
    })
    .reply(200, {
      access_token: 'valid access token stub',
      token_type: 'Bearer',
      pct: 'valid pct stub',
      upgraded: false
    })
}
