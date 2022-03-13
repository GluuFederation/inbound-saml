// receive authenticate request
// validate request
// calls passport middleware authenticate
// should return 302 redirect or POST form
import { mockSpProxyConfig } from '@sp-proxy/frameworks-drivers/main/mocks/mockSpProxyConfig.mock'
import routes from '@sp-proxy/frameworks-drivers/main/routes'
import { mockUmaEndpoint } from '@sp-proxy/interface-adapters/data/mocks/mockUmaEndpoint.mock'
import { TrustRelationDataModel } from '@sp-proxy/interface-adapters/data/models/TrustRelationDataModel'
import express from 'express'
import nock from 'nock'
import request from 'supertest'

const app = express()
app.use(routes)
const eut = '/inbound-saml/sp/authenticate'
describe('authenticateRouter', () => {
  beforeAll(async () => {
    mockSpProxyConfig()

    // setup mock for returning valid host from getTrByHost endpoint
    // trusted-idps/{host}

    const responseData: TrustRelationDataModel = {
      remoteIdp: {
        name: 'valid name integration',
        host: 'pocidp.techno24x7.com',
        supportedSingleSignOnServices: [
          {
            binding: 'urn:mace:shibboleth:2.0:profiles:AuthnRequest',
            location:
              'https://pocidp.techno24x7.com/idp/profile/SAML2/Unsolicited/SSO'
          },
          {
            binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
            location: 'https://pocidp.techno24x7.com/idp/profile/SAML2/POST/SSO'
          },
          {
            binding:
              'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST-SimpleSign',
            location:
              'https://pocidp.techno24x7.com/idp/profile/SAML2/POST-SimpleSign/SSO'
          },
          {
            binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect',
            location:
              'https://pocidp.techno24x7.com/idp/profile/SAML2/Redirect/SSO'
          }
        ],
        signingCertificates: [],
        id: 'ac58938d-8091-4e50-b769-f71198c28f26'
      },
      selectedSingleSignOnService: {
        binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
        location: 'https://pocidp.techno24x7.com/idp/profile/SAML2/POST/SSO'
      }
    }
    const endpoint = `trusted-idps/${responseData.remoteIdp.host}`
    mockUmaEndpoint(endpoint, responseData)
    app.use(routes)
  })
  afterAll(async () => {
    jest.clearAllMocks()
    nock.cleanAll()
  })
  it('should return auto-submit form', async () => {
    const res = await request(app)
      .get(eut)
      .query({ providerHost: 'pocidp.techno24x7.com' })
    expect(res.text).toContain('SAMLRequest')
    expect(res.text).toContain('method="post"')
    expect(res.text).toContain('pocidp.techno24x7.com')
    expect(res.text).toContain(
      'action="https://pocidp.techno24x7.com/idp/profile/SAML2/POST/SSO"'
    )
  })
})
