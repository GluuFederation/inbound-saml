import nock from 'nock'
import fs from 'fs'

const validXmlData = fs
  .readFileSync(process.cwd() + '/src/testdata/shibIdpMetadata.xml')
  .toString()
export const endpoints = {
  valid: 'https://remoteIdp.com/metadata',
  unacessible: 'https://remoteIdp.com/unacessible',
  error: 'https://remoteIdp.com/error'
}
export const mockGetUrlEndpoints = function (): void {
  nock('https://remoteIdp.com').get('/metadata').reply(200, validXmlData, {
    'Content-Type': 'application/xml;charset=utf-8'
  })

  nock('https://remoteIdp.com')
    .get('/unacessible')
    .replyWithError('not acessible')

  nock('https://remoteIdp.com').get('/error').reply(400).persist()
}
