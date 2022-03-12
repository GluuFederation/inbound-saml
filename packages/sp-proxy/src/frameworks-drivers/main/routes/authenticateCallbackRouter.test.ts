// generate fake configuration
import serverConfig from '@sp-proxy/frameworks-drivers/main/config/env'
import * as generator from '@sp-proxy/frameworks-drivers/main/helpers/generatePostProfileForm'
import { mockAuthXmlEndpoint } from '@sp-proxy/frameworks-drivers/main/mocks/externalMetadataUrl.mock'
import routes from '@sp-proxy/frameworks-drivers/main/routes'
import { mockUmaEndpoint } from '@sp-proxy/interface-adapters/data/mocks/mockUmaEndpoint.mock'
import { TrustRelationDataModel } from '@sp-proxy/interface-adapters/data/models/TrustRelationDataModel'
import express from 'express'
import { readFileSync } from 'fs'
import nock from 'nock'
import { signXmlResponse } from 'passport-saml/lib/node-saml/utility'
import request from 'supertest'
import { mockAddTrEndpoint } from '../mocks/mockAddTrEndpoint'

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

const idpPrivateSigningKey = readFileSync(
  `${process.cwd()}/packages/testdata/decryptionPvk.key`
)

const nowIso = new Date().toISOString()
const oneHourLater = new Date(Date.now() + 2 * (60 * 60 * 1000)).toISOString()

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

const createTrustRelationMock = async (): Promise<void> => {
  // mock a
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
  beforeEach(async () => {
    const mockedResponseData: TrustRelationDataModel = {
      remoteIdp: {
        name: '"any name',
        host: 'samltest.id',
        supportedSingleSignOnServices: [
          { binding: 'valid binding', location: 'valid location' }
        ],
        signingCertificates: [
          'MIIFazCCA1OgAwIBAgIUWTwsoJ1C56f2MFbinktEcvzn2DYwDQYJKoZIhvcNAQELBQAwRTELMAkGA1UEBhMCQVUxEzARBgNVBAgMClNvbWUtU3RhdGUxITAfBgNVBAoMGEludGVybmV0IFdpZGdpdHMgUHR5IEx0ZDAeFw0yMTA5MDcwMzU4MDRaFw0yMjA5MDcwMzU4MDRaMEUxCzAJBgNVBAYTAkFVMRMwEQYDVQQIDApTb21lLVN0YXRlMSEwHwYDVQQKDBhJbnRlcm5ldCBXaWRnaXRzIFB0eSBMdGQwggIiMA0GCSqGSIb3DQEBAQUAA4ICDwAwggIKAoICAQDBliPpIffU+C2c3NRAcoJYqEGMEp7RwjWCzZWYYNFfzNr86/Vn5uezbn6frAtGeK37XJaJ2aVK9cf2Zwl9Z6+3lNIfD7sFZMziXoj9YAuq5znrAZ0uZsiU/Fdrbs5FNfKYfu9e2wtQxjj9ayw/WfCaG5hNBAyAF1ntARp9nBaHqdkAv98Ia2WqaB4jsAkl1BceSMdZ/emwx3uN2hflh3nJpZnInMCxj9hXDuqZa3C5ef+2haI/N91138T331aWE3aO8jT7wTanX+YcuBg7f09t8y15Qp4y3sdbHGgrMLGv82TwLktOG1Xo1NEKnrgJ4VkGZPmosklshOHBswJk3srK6ck2ViZQHYbAp+YJWab8HgZ0qXrMsuEmkWSRdloupkKvC4Bv/Mxrw62lkpg3m1ECAVgDlSDx0wT5hR53qFYzdwze7IPf8poWyYHP+KIKmST9xYe4y9XDlVkhcwCIjNsrVXloQBKHSRHli+l5NarAlNyV5OaaPapn80yT8zF4qswoXifZy7EeZY9nHuAzvhaCmyIhPvalNfPsEm28lp7C72xotX1PRfdML23yykqOwZsj2Fq0kMKTM3kyZ3h6P1RhjUMN/RzBSdiRzxm96SGAxdATZt0z/ertdD4QebOGJxBDqpN8bPWMKocQfgTD7phbfwGA/xq1+APGvL7d9Ff0iQIDAQABo1MwUTAdBgNVHQ4EFgQU9c2hH027izNHZdftOvr7HQPYQvkwHwYDVR0jBBgwFoAU9c2hH027izNHZdftOvr7HQPYQvkwDwYDVR0TAQH/BAUwAwEB/zANBgkqhkiG9w0BAQsFAAOCAgEAiC0dUZuCPZuQO675nMjbOgLemKTZojKyL8NVR5DDeFIJGa4SiQVIzw3W4T6dCrVKCL9vuCte2NQrhQsivd3hoarS1Ou0I9YAjruxdRZtjEHLL8PMKrrfjN4I2jBlDSt43tJdM0QL58+u/48Tk2gQXUuFrUqahIVmcknTguZvZoK3pWw5T+1b2FKiSKiUgRxTEp5dkb8jAmS+o1ywcneb3gcBp2KHMIDN+8iIxDPfNZ2P5m1Ob3/QtOp0lEOS6VI/JMxlti25oOw0/D8zamvd4ZU0qojLog0SkrATTqzOhG+pL9y2wz2x5bKjrdKMvMCotCMGQkHCbbnh7H4upV72nsjO1RWU6pHMODsg3K3MtXhah8EaVST3AHemo2tyAqCpwg7vSdccJt94twl/4d5g/a/FXzR/6JSBmaw4mChea7bkUDOG+oEnW2KqDUmfppzl8yGH01ctzd96ypMQlhdkD8GdjMiintCiz3RY5bVWB7xM2KUr7ijHLVnHFnMS7ikjSFRwjNTs8ZdAck6KtBmaKzkY6IaNs9s2KNMW0ZLsefQKVhINjub+qAsMLoGKn520EGbvLj1NcEHd3fOFxs5EEb0j6Eb9plp3ZoE5hxzjeKyfZVXo942uF+SA+OXXFWIJhFd1hg64QpFNALqDrCv2pwktffaZoTZddXQBomPOzFM='
        ],
        id: 'valid id'
      },
      selectedSingleSignOnService: {
        binding: 'any binding',
        location: 'https://samltest.id/any-path'
      }
    }
    mockUmaEndpoint('trusted-idps/samltest.id', mockedResponseData)
  })
  beforeAll(async () => {
    mockAddTrEndpoint()
    await createTrustRelationMock()
  })
  afterAll(async () => {
    jest.clearAllMocks()
    nock.cleanAll()
  })
  it('should return error if no origin header', async () => {
    const res = await request(app)
      .post(eut)
      .set('content-type', 'application/x-www-form-urlencoded')
      .send('SAMLwhateverinvalid body')
    expect(res.statusCode).toBeGreaterThanOrEqual(400)
  })
  it('should not return error for signed response', async () => {
    // lets add a mocked TR
    await createTrustRelationMock()
    const signedXml = signXmlResponse(xml, {
      privateKey: idpPrivateSigningKey
    })

    const base64xml = Buffer.from(signedXml).toString('base64')
    const body = { SAMLResponse: base64xml }

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
  it('should return auto-submit form', async () => {
    await createTrustRelationMock()
    const signedXml = signXmlResponse(xml, {
      privateKey: idpPrivateSigningKey
    })

    const base64xml = Buffer.from(signedXml).toString('base64')
    const body = { SAMLResponse: base64xml }

    jest
      .spyOn(generator, 'generatePostProfileForm')
      .mockReturnValueOnce('auto-submit form')
    const res = await request(app)
      .post(eut)
      .set('origin', 'samltest.id')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(body)
    // console.log(res)
    expect(res.statusCode).not.toBeGreaterThanOrEqual(400)
    expect(res.text).toBe('auto-submit form')
  })
})
