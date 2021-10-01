import nock from 'nock'
import fs from 'fs'

const validXmlData = fs
  .readFileSync(process.cwd() + '/packages/testdata/shibIdpMetadata.xml')
  .toString()

export const mockValidXmlDataEndpoint = (): void => {
  nock('https://remoteIdp.com')
    .get('/metadata')
    .reply(200, validXmlData, {
      'Content-Type': 'application/xml;charset=utf-8'
    })
    .persist()
}

/**
 * Metadata to be used in tests integration, initially to test callback endpoint
 */
export const mockAuthXmlEndpoint = (): void => {
  const authXmlData = fs
    .readFileSync(
      process.cwd() +
        '/packages/sp-proxy/src/frameworks-drivers/main/mocks/mockAuthMetadata.xml'
    )
    .toString()
  nock('https://auth-remote-idp')
    .get('/metadata')
    .reply(200, authXmlData, {
      'Content-Type': 'application/xml;charset=utf-8'
    })
    .persist()
}
