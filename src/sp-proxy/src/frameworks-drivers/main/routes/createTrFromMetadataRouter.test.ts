import routes from '@sp-proxy/frameworks-drivers/main/routes'
import express from 'express'
import request from 'supertest'
import { mockSpProxyConfig } from '@sp-proxy/frameworks-drivers/main/mocks/mockSpProxyConfig.mock'

jest.mock('@sp-proxy/interface-adapters/data/FileReadProxyConfig')

const app = express()

describe('metadataRoute', () => {
  beforeAll(async () => {
    // setup app for testing this route
    app.use(routes)
    mockSpProxyConfig()
  })
  afterAll(async () => {
    jest.clearAllMocks()
  })
  const endpoint = '/inbound-saml/trust-relation/metadata'
  it('should return 200', async () => {
    await request(app).get(endpoint).expect(200)
  })
})
