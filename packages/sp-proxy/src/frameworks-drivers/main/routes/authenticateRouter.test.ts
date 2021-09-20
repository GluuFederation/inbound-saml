// receive authenticate request
// validate request
// calls passport middleware authenticate
// should return 302 redirect or POST form
import express from 'express'
import routes from '@sp-proxy/frameworks-drivers/main/routes'
import request from 'supertest'
import { mockSpProxyConfig } from '@sp-proxy/frameworks-drivers/main/mocks/mockSpProxyConfig.mock'
import nock from 'nock'
import { Collection, MongoClient } from 'mongodb'
import config from '@sp-proxy/interface-adapters/config/env'

const app = express()
app.use(routes)
const eut = '/inbound-saml/sp/authenticate'
describe('authenticateRouter', () => {
  let mongoClient: MongoClient
  let connection: MongoClient
  let collection: Collection
  beforeAll(async () => {
    mockSpProxyConfig()
    // setup app and db for testing this route
    mongoClient = new MongoClient(config.database.mongo.uri)
    connection = await mongoClient.connect()
    collection = connection
      .db(config.database.mongo.dbName)
      .collection(config.database.mongo.collections.trustRelations)
    await collection.insertOne({
      trustRelation: {
        _id: '902893f7-6769-4389-a43b-4fab4e9f8783',
        props: {
          remoteIdp: {
            _id: 'ac58938d-8091-4e50-b769-f71198c28f26',
            props: {
              name: 'valid name integration',
              signingCertificates: [
                'MIIDjTCCAnUCFEfrDgg5EbuYxdqMKep1Dy6l9tfmMA0GCSqGSIb3DQEBCwUAMIGCMQswCQYDVQQGEwJCUjELMAkGA1UECAwCU1AxEjAQBgNVBAcMCVNhbyBQYXVsbzETMBEGA1UECgwKU2luZ2xlTWV0YTEeMBwGA1UEAwwVcG9jaWRwLnRlY2hubzI0eDcuY29tMR0wGwYJKoZIhvcNAQkBFg5jaHJpc0BnbHV1Lm9yZzAeFw0yMTA2MjQxNzMxMDJaFw0yMjA2MjQxNzMxMDJaMIGCMQswCQYDVQQGEwJCUjELMAkGA1UECAwCU1AxEjAQBgNVBAcMCVNhbyBQYXVsbzETMBEGA1UECgwKU2luZ2xlTWV0YTEeMBwGA1UEAwwVcG9jaWRwLnRlY2hubzI0eDcuY29tMR0wGwYJKoZIhvcNAQkBFg5jaHJpc0BnbHV1Lm9yZzCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALGNOi4d5sbOIaqmJY7VLuLODs2bO1VvGN8AydqVL1TR2ibB1ZmkTZCBQAulh3iiW+NwHYpPVzoOkEmCH7qT+BvqQ0LuAWwb88+a7G4t69PwVkO1oE8sxApuQ0qh7TQ0eRhn1jhROff1M+SOvDYeJXezMLPyDSlgzzt9oEymb3spoV7LlyPfDXhfGIrGDWsrGFTAMC5wAlyMji3Cv+rjSNdJSFQQ07mYIGAiV9jmIDwe47amTvmMQZTXCOQlgJnjivalUfRkZnhYnBeS4tkkuQu/ZQqM5EOaX4hyZkYMImjpWq1Era4UmMht1y+zPLwIyGjoBMRvG/Iznx6PWMQeTacCAwEAATANBgkqhkiG9w0BAQsFAAOCAQEAGuxFRGUxlOJ1EdgJSidlDbGY/LpuGoeQHmBk3gFhug8FMKjeY2MU+RfpCzxoR1sF2wsshagcSMYs7D6ApWFcg+RqpTJ6B3CP5rANx2+MwXDs8lEf0yrswlDmCVXTK8g5CwYtARqHPM9kv0gFUkSfSobRvkTRGPzYwhvmPNpTWKtZtPF/rNam8Y3l56jEeMFJjLLtz/3Q7/ofH94rsDFFgslzQrk0ETEftKsgV1g0s9/icPzgH9cYK+J2E/ADoC0j2XCk8TegMglUvJ34DsJUrL/sYIs/Z7A5nnrVMiTx7wAGDl1w6so7rK+h/TkIrORwOyXWyO1LIHD5+yMkv1ARew=='
              ],
              supportedSingleSignOnServices: [
                {
                  props: {
                    binding: 'urn:mace:shibboleth:2.0:profiles:AuthnRequest',
                    location:
                      'https://pocidp.techno24x7.com/idp/profile/SAML2/Unsolicited/SSO'
                  },
                  validator: {}
                },
                {
                  props: {
                    binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
                    location:
                      'https://pocidp.techno24x7.com/idp/profile/SAML2/POST/SSO'
                  },
                  validator: {}
                },
                {
                  props: {
                    binding:
                      'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST-SimpleSign',
                    location:
                      'https://pocidp.techno24x7.com/idp/profile/SAML2/POST-SimpleSign/SSO'
                  },
                  validator: {}
                },
                {
                  props: {
                    binding:
                      'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect',
                    location:
                      'https://pocidp.techno24x7.com/idp/profile/SAML2/Redirect/SSO'
                  },
                  validator: {}
                }
              ]
            }
          },
          singleSignOnService: {
            props: {
              binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
              location:
                'https://pocidp.techno24x7.com/idp/profile/SAML2/POST/SSO'
            },
            validator: {}
          }
        }
      }
    })
    app.use(routes)
  })
  afterAll(async () => {
    await collection.drop()
    await connection.close()
    jest.clearAllMocks()
    nock.cleanAll()
  })
  it('should return auto-submit form', async () => {
    const res = await request(app)
      .get(eut)
      .query({ providerHost: 'pocidp.techno24x7.com' })
    //  .expect(200)
    // console.log(res)
    expect(res.text).toContain('SAMLRequest')
    expect(res.text).toContain('method="post"')
    expect(res.text).toContain('pocidp.techno24x7.com')
    expect(res.text).toContain(
      'action="https://pocidp.techno24x7.com/idp/profile/SAML2/POST/SSO"'
    )
  })
})
