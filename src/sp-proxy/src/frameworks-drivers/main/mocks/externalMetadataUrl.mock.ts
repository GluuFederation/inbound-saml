import nock from 'nock'
import fs from 'fs'

const validXmlData = fs
  .readFileSync(process.cwd() + '/src/testdata/shibIdpMetadata.xml')
  .toString()

export const mockValidXmlDataEndpoint = (): void => {
  nock('https://remoteIdp.com')
    .get('/metadata')
    .reply(200, validXmlData, {
      'Content-Type': 'application/xml;charset=utf-8'
    })
    .persist()
}
