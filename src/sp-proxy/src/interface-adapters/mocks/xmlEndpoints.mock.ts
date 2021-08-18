import nock from 'nock'
import * as fs from 'fs'

const validXmlData = fs
  .readFileSync(process.cwd() + '/src/testdata/shibIdpMetadata.xml')
  .toString()

export const mockXmlEndpoints = (): void => {
  nock('https://remoteIdp.com')
    .get('/metadata')
    .reply(200, validXmlData, {
      'Content-Type': 'application/xml;charset=utf-8'
    })
    .persist()

  nock('https://remoteIdp.com')
    .get('/unacessible')
    .replyWithError('not acessible')

  nock('https://remoteIdp.com')
    .get('/unparsable')
    .reply(200, '>roo invalid< metadata', {
      'Content-Type': 'application/xml;charset=utf-8'
    })
}
