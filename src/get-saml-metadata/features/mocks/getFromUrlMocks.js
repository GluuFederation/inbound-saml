const nock = require('nock')
const fs = require('fs')

const validXmlData = fs.readFileSync(process.cwd() + '/src/testdata/shibIdpMetadata.xml').toString()

const mockGetUrlEndpoints = function () {
  nock('https://remoteIdp.com')
    .get('/metadata')
    .reply(200, validXmlData, { 'Content-Type': 'application/xml;charset=utf-8' })

  nock('https://remoteIdp.com')
    .get('/unacessible')
    .replyWithError('not acessible')

  nock('https://remoteIdp.com')
    .get('/unparsable')
    .reply(200, '>roo invalid< metadata', { 'Content-Type': 'application/xml;charset=utf-8' })
    .persist()
}

module.exports = {
  mockGetUrlEndpoints
}
