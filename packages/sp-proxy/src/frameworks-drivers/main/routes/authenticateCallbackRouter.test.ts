// generate fake configuration
import { readFileSync } from 'fs'
import { signXmlResponse } from 'passport-saml/lib/node-saml/utility'
import express from 'express'
import routes from '@sp-proxy/frameworks-drivers/main/routes'
import request from 'supertest'
import serverConfig from '@sp-proxy/frameworks-drivers/main/config/env'
import { Collection, MongoClient } from 'mongodb'
import config from '@sp-proxy/interface-adapters/config/env'
import { mockAuthXmlEndpoint } from '@sp-proxy/frameworks-drivers/main/mocks/externalMetadataUrl.mock'

const app = express()
app.use(routes)
const eut = '/inbound-saml/sp/callback'

const encodeCredentials = (user: string, password: string): string => {
  return Buffer.from(`${user}:${password}`).toString('base64')
}
const validCredentials = encodeCredentials(
  serverConfig.adminUser,
  serverConfig.adminPassword
)

const createTrustRelationMock = async (): Promise<void> => {
  // we need to mock a metadata endpoint
  mockAuthXmlEndpoint()
  // lets use our endpoint
  const metadataEndpoint = 'https://auth-remote-idp/metadata'
  await request(app)
    .post('/inbound-saml/trust-relation/metadata')
    .set('content-type', 'application/json')
    .set('authorization', validCredentials)
    .send({ name: 'any name', url: metadataEndpoint })
    .expect(201)
}

describe('authenticateCallbackRouter', () => {
  let mongoClient: MongoClient
  let connection: MongoClient
  let collection: Collection

  beforeAll(async () => {
    mongoClient = new MongoClient(config.database.mongo.uri)
    connection = await mongoClient.connect()
    collection = connection
      .db(config.database.mongo.dbName)
      .collection(config.database.mongo.collections.trustRelations)
    app.use(routes)
  })
  afterAll(async () => {
    await collection.drop()
    await connection.close()
    jest.clearAllMocks()
  })
  it('should return error if no origin header', async () => {
    await createTrustRelationMock()
    const res = await request(app)
      .post(eut)
      .set('content-type', 'application/x-www-form-urlencoded')
      .send('SAMLwhateverinvalid body')
    expect(res.statusCode).toBeGreaterThanOrEqual(400)
  })
  it('should not return error for signed response', async () => {
    // lets add a mocked TR
    await createTrustRelationMock()
    const nowIso = new Date().toISOString()
    const oneHourLater = new Date(
      Date.now() + 2 * (60 * 60 * 1000)
    ).toISOString()
    const xml =
      '<?xml version="1.0" encoding="UTF-8"?>' +
      '<saml2p:Response ID="_7d042ddb800b8a5a2bb908d7c8a4fcf2"' +
      '    InResponseTo="_2862364e83deb8f6fc84"' +
      '    IssueInstant="' +
      nowIso +
      '" Version="2.0" xmlns:saml2p="urn:oasis:names:tc:SAML:2.0:protocol">' +
      '    <saml2:Issuer xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion">https://samltest.id/saml/idp</saml2:Issuer>' +
      '    <saml2p:Status>' +
      '        <saml2p:StatusCode Value="urn:oasis:names:tc:SAML:2.0:status:Success"/>' +
      '    </saml2p:Status>' +
      '    <saml2:Assertion ID="_940795cdae2fcda8d27adaf2df5db3c8"' +
      '        IssueInstant="' +
      nowIso +
      '" Version="2.0" xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion">' +
      '        <saml2:Issuer>https://samltest.id/saml/idp</saml2:Issuer>' +
      '        <saml2:Subject>' +
      '            <saml2:NameID' +
      '                Format="urn:oasis:names:tc:SAML:2.0:nameid-format:transient"' +
      '                NameQualifier="https://samltest.id/saml/idp"' +
      '                SPNameQualifier="onelogin_saml" xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion">AAdzZWNyZXQxAIpE4k+RXZSvQCEaol3phUTkxRs/PVJ4y5/QxikWlG91D5HNQfZ4U8dOTHV78ujFuch+1J1+JJbmSQfA3cmuMCxJWq6OOTPjxIVLH95YDdi/+dA=</saml2:NameID>' +
      '            <saml2:SubjectConfirmation Method="urn:oasis:names:tc:SAML:2.0:cm:bearer">' +
      '                <saml2:SubjectConfirmationData Address="189.120.78.230"' +
      '                    InResponseTo="_2862364e83deb8f6fc84"' +
      '                    NotOnOrAfter="' +
      oneHourLater +
      '" Recipient="https://devtemp.techno24x7.com:5000/inbound-saml/sp/callback"/>' +
      '            </saml2:SubjectConfirmation>' +
      '        </saml2:Subject>' +
      '        <saml2:Conditions NotBefore="' +
      nowIso +
      '" NotOnOrAfter="' +
      oneHourLater +
      '">' +
      '            <saml2:AudienceRestriction>' +
      '                <saml2:Audience>onelogin_saml</saml2:Audience>' +
      '            </saml2:AudienceRestriction>' +
      '        </saml2:Conditions>' +
      '        <saml2:AuthnStatement AuthnInstant="' +
      nowIso +
      '" SessionIndex="_e07d155393c328c3ced903cf71423e32">' +
      '            <saml2:SubjectLocality Address="189.120.78.230"/>' +
      '            <saml2:AuthnContext>' +
      '                <saml2:AuthnContextClassRef>urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport</saml2:AuthnContextClassRef>' +
      '            </saml2:AuthnContext>' +
      '        </saml2:AuthnStatement>' +
      '        <saml2:AttributeStatement>' +
      '            <saml2:Attribute FriendlyName="uid"' +
      '                Name="urn:oid:0.9.2342.19200300.100.1.1" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:uri">' +
      '                <saml2:AttributeValue>sheldon</saml2:AttributeValue>' +
      '            </saml2:Attribute>' +
      '            <saml2:Attribute' +
      '                Name="urn:oasis:names:tc:SAML:attribute:subject-id" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:uri">' +
      '                <saml2:AttributeValue' +
      '                    xmlns:xsd="http://www.w3.org/2001/XMLSchema"' +
      '                    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xsd:string">scooper@samltest.id</saml2:AttributeValue>' +
      '            </saml2:Attribute>' +
      '            <saml2:Attribute FriendlyName="telephoneNumber"' +
      '                Name="urn:oid:2.5.4.20" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:uri">' +
      '                <saml2:AttributeValue>+1-555-555-5515</saml2:AttributeValue>' +
      '            </saml2:Attribute>' +
      '            <saml2:Attribute FriendlyName="role"' +
      '                Name="https://samltest.id/attributes/role" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:uri">' +
      '                <saml2:AttributeValue' +
      '                    xmlns:xsd="http://www.w3.org/2001/XMLSchema"' +
      '                    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="xsd:string">employee@samltest.id</saml2:AttributeValue>' +
      '            </saml2:Attribute>' +
      '            <saml2:Attribute FriendlyName="mail"' +
      '                Name="urn:oid:0.9.2342.19200300.100.1.3" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:uri">' +
      '                <saml2:AttributeValue>scooper@samltest.id</saml2:AttributeValue>' +
      '            </saml2:Attribute>' +
      '            <saml2:Attribute FriendlyName="displayName"' +
      '                Name="urn:oid:2.16.840.1.113730.3.1.241" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:uri">' +
      '                <saml2:AttributeValue>Sheldor</saml2:AttributeValue>' +
      '            </saml2:Attribute>' +
      '            <saml2:Attribute FriendlyName="sn" Name="urn:oid:2.5.4.4" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:uri">' +
      '                <saml2:AttributeValue>Cooper</saml2:AttributeValue>' +
      '            </saml2:Attribute>' +
      '            <saml2:Attribute FriendlyName="givenName"' +
      '                Name="urn:oid:2.5.4.42" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:uri">' +
      '                <saml2:AttributeValue>Sheldon</saml2:AttributeValue>' +
      '            </saml2:Attribute>' +
      '        </saml2:AttributeStatement>' +
      '    </saml2:Assertion>' +
      '</saml2p:Response>'
    const idpPrivateSigningKey = readFileSync(
      `${process.cwd()}/packages/testdata/decryptionPvk.key`
    )
    // const idpSigningCert = readFileSync(
    //   `${process.cwd()}/packages/testdata/decryptionCert.pem`,
    //   'utf-8'
    // )

    const signedXml = signXmlResponse(xml, {
      privateKey: idpPrivateSigningKey
    })

    // const samlObj = new SAML({ cert: idpSigningCert })
    const base64xml = Buffer.from(signedXml).toString('base64')
    const body = { SAMLResponse: base64xml }
    // console.log(await samlObj2.validatePostResponseAsync(body))

    const res = await request(app)
      .post(eut)
      .set('origin', 'samltest.id')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(body)

    expect(res.statusCode).not.toBeGreaterThanOrEqual(400)
  })
  it('should return error if invalid SAMLResponse', async () => {
    const res = await request(app)
      .post(eut)
      .set('origin', 'samltest.id')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({ SAMLResponse: 'a very invalid samlresponse' })
    expect(res.statusCode).toBeGreaterThanOrEqual(400)
  })
})
