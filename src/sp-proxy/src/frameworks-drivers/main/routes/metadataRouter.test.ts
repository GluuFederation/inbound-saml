import routes from '@sp-proxy/frameworks-drivers/main/routes'
import { InvalidRequestError } from '@sp-proxy/interface-adapters/delivery/errors/InvalidRequestError'
import { GenerateMetadataController } from '@sp-proxy/interface-adapters/delivery/GenerateMetadataController'
import * as configRepo from '@sp-proxy/interface-adapters/data/FileReadProxyConfig'
import express from 'express'
import request from 'supertest'
import { SpProxyConfigProps } from '@sp-proxy/entities/protocols/SpProxyConfigProps'
import { SpProxyConfig } from '@sp-proxy/entities/SpProxyConfig'
jest.mock('@sp-proxy/interface-adapters/data/FileReadProxyConfig')

describe('metadataRoute', () => {
  const app = express()
  beforeAll(async () => {
    // setup app for testing this route
    app.use(routes)
    const mockedProps: SpProxyConfigProps = {
      host: 'myhost.com',
      requestedIdentifierFormat: 'my:name:identifier:requested',
      authnContextIdentifierFormat: 'my:authn:name:identifier:format',
      skipRequestCompression: true,
      decryption: {
        publicCertPath: process.cwd() + '/src/testdata/cert.pem',
        privateKeyPath: process.cwd() + '/src/testdata/key.pem'
      },
      signing: {
        publicCertPath: process.cwd() + '/src/testdata/cert.pem',
        privateKeyPath: process.cwd() + '/src/testdata/key.pem'
      }
    }
    const mockedConfig: SpProxyConfig = new SpProxyConfig(mockedProps)
    jest
      .spyOn(configRepo.FileReadProxyConfig.prototype, 'read')
      .mockResolvedValueOnce(mockedConfig)

    // cfg.database.file.proxyConfigPath =
    //   process.cwd() + '/src/testdata/sp-proxy-config-test.json'
  })
  it('should return 400 if controller throws InvalidRequestError', async () => {
    jest
      .spyOn(GenerateMetadataController.prototype, 'handle')
      .mockImplementationOnce(() => {
        throw new InvalidRequestError('Invalid request on controller')
      })
    await request(app).get('/sp/metadata').expect(400)
  })
  it('should return InvalidRequestError message in body', async () => {
    jest
      .spyOn(GenerateMetadataController.prototype, 'handle')
      .mockImplementationOnce(() => {
        throw new InvalidRequestError('Invalid request on controller')
      })
    await request(app)
      .get('/sp/metadata')
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
    await request(app).get('/sp/metadata').expect(500)
  })
  it('should return status 200', async () => {
    await request(app).get('/sp/metadata').expect(200)
  })
})
