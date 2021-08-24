import routes from '@sp-proxy/frameworks-drivers/main/routes'
import { InvalidRequestError } from '@sp-proxy/interface-adapters/delivery/errors/InvalidRequestError'
import { GenerateMetadataController } from '@sp-proxy/interface-adapters/delivery/GenerateMetadataController'
import express from 'express'
import request from 'supertest'

const app = express()
app.use(routes)
describe('metadataRoute', () => {
  it('should return 400 if controller throws InvalidRequest', async () => {
    jest
      .spyOn(GenerateMetadataController.prototype, 'handle')
      .mockImplementationOnce(() => {
        throw new InvalidRequestError('Invalid request on controller')
      })
    await request(app).get('/sp/metadata').expect(400)
  })
  // it('should receive 200', async () => {
  //   await request(app).get('/sp/metadata').expect(200)
  // })
})
