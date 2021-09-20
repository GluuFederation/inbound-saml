import routes from '@sp-proxy/frameworks-drivers/main/routes'
import { InvalidRequestError } from '@sp-proxy/interface-adapters/delivery/errors/InvalidRequestError'
import { GenerateMetadataController } from '@sp-proxy/interface-adapters/delivery/GenerateMetadataController'
import express from 'express'
import request from 'supertest'
import { mockSpProxyConfig } from '@sp-proxy/frameworks-drivers/main/mocks/mockSpProxyConfig.mock'

jest.mock('@sp-proxy/interface-adapters/data/FileReadProxyConfig')

const app = express()

const endpoint = '/inbound-saml/sp/metadata'

describe('metadataRoute', () => {
  beforeAll(async () => {
    // setup app for testing this route
    app.use(routes)
    mockSpProxyConfig()
  })
  afterAll(async () => {
    jest.clearAllMocks()
  })
  it('should return InvalidRequestError message in body', async () => {
    jest
      .spyOn(GenerateMetadataController.prototype, 'handle')
      .mockImplementationOnce(() => {
        throw new InvalidRequestError('Invalid request on controller')
      })
    await request(app)
      .get(endpoint)
      .expect(400)
      .expect('InvalidRequestError: Invalid request on controller')
  })
  it('should return 500 if any other error is thrown', async () => {
    class AnyOtherError extends Error {}
    jest
      .spyOn(GenerateMetadataController.prototype, 'handle')
      .mockImplementationOnce(() => {
        throw new AnyOtherError('Any other error ocurred')
      })
    await request(app).get(endpoint).expect(500)
  })
  it('should return status 200', async () => {
    await request(app).get(endpoint).expect(200)
  })
  it('should return with xml content-type', async () => {
    await request(app).get(endpoint).expect(200).expect('content-type', /xml/)
  })
  it('should return xml containing config values', async () => {
    // const mockedProps = mockedConfigProps
    const res = await request(app).get(endpoint).expect(200)
    expect(res.text).toContain('sp/callback')
    expect(res.text).toContain('KeyDescriptor use="encryption"')
    expect(res.text).toContain('KeyDescriptor use="signing"')
    expect(res.text).toContain(
      'MIIFFjCCAv4CCQDFhyLx2QM/TTANBgkqhkiG9w0BAQsFADBNMQswCQYDVQQGEwJCUjELMAkGA1UECAwCU1AxCzAJBgNVBAcMAlNQMQ0wCwYDVQQKDARHbH'
    )
  })
  it('should return 500 if exception as string is thrown', async () => {
    jest
      .spyOn(GenerateMetadataController.prototype, 'handle')
      .mockImplementationOnce(() => {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw 'Any other error ocurred'
      })
    await request(app).get(endpoint).expect(500)
  })
  it('should return default message when error is 500', async () => {
    jest
      .spyOn(GenerateMetadataController.prototype, 'handle')
      .mockImplementationOnce(() => {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw 'Any other error ocurred'
      })
    await request(app).get(endpoint).expect(500).expect('Internal Server Error')
  })
})
