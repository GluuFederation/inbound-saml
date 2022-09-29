const { Given, When, Then } = require('@cucumber/cucumber')
const fs = require('fs')
const assert = require('assert')
const parser = require('fast-xml-parser')
const { getFromFile } = require('../../../../dist/get-saml-metadata/src/lib')
const chai = require('chai')
const assertChai = chai.assert

const getIdpSigningCerts = (keyDescriptorList) => {
  const idpSigningCert = []
  for (const keyDescriptor of keyDescriptorList) {
    if (keyDescriptor['@_use'] === 'signing') {
      idpSigningCert.push(
        keyDescriptor['ds:KeyInfo']['ds:X509Data'][
          'ds:X509Certificate'
        ].replace(/(\r\n|\n|\r)/gm, '')
      )
    }
  }
  return idpSigningCert
}

const getSingleSignOnServices = (rawSingleSignOnServiceList) => {
  const singleSignOnServices = []
  for (const rawSingleSignOnService of rawSingleSignOnServiceList) {
    singleSignOnServices.push({
      binding: rawSingleSignOnService['@_Binding'],
      location: rawSingleSignOnService['@_Location']
    })
  }
  return singleSignOnServices
}

const parseMetadata = (xmlData) => {
  const options = {
    ignoreAttributes: false
  }
  const parsed = parser.parse(xmlData, options)
  const keyDescriptorList =
    parsed.EntityDescriptor.IDPSSODescriptor.KeyDescriptor
  // const mapping = ['ds:KeyInfo']['ds:X509Data']['ds:X509Certificate']
  const idpSigningCert = getIdpSigningCerts(keyDescriptorList)

  const rawSingleSignOnServiceList =
    parsed.EntityDescriptor.IDPSSODescriptor.SingleSignOnService
  const singleSignOnServices = getSingleSignOnServices(
    rawSingleSignOnServiceList
  )

  const data = {
    idpSigningCert: idpSigningCert,
    singleSignOnServices: singleSignOnServices
  }

  return data
}

Given('{string} exists in local file system', function (file) {
  this.filePath = process.cwd() + `/${file}`
  const existsInLocalFileSystem = fs.existsSync(this.filePath)
  assert.strictEqual(existsInLocalFileSystem, true)
})

Given('{string} DOES NOT exists in local file system', function (string) {
  this.filePath = '/unexisant/filePath'
  const existsInLocalFileSystem = fs.existsSync(this.filePath)
  assert.strictEqual(existsInLocalFileSystem, false)
})

Given('XML data is valid', function () {
  this.xmlData = fs.readFileSync(this.filePath).toString()
  let isValid
  if (this.filePath) {
    isValid = parser.validate(this.xmlData)
  }
  assert.strictEqual(isValid, true)
})

Given('XML data is invalid', function (done) {
  const invalidXmlLocation = process.cwd + '/packages/testdata/invalidXml.xml'
  this.filePath = invalidXmlLocation
  this.xmlData = '<root> This is invalid >root'
  let isValid
  if (this.filePath) {
    isValid = parser.validate(this.xmlData)
  }
  assert.strictEqual(isValid.err.code, 'InvalidTag')
  done()
})

When('client call getFromFile with the valid file path', function (done) {
  this.thrownErrors = []
  getFromFile(this.filePath)
    .then((result) => {
      this.result = result
      done()
    })
    .catch((err) => {
      this.thrownErrors.push(err)
      done()
    })
})

When('client call getFromFile with the invalid file path', function (done) {
  this.thrownErrors = []
  getFromFile(this.filePath)
    .then((result) => {
      this.result = result
      done()
    })
    .catch((err) => {
      this.thrownErrors.push(err)
      done()
    })
})

Then('It should return a valid object with metadata values', function () {
  assert(this.result)
  assertChai.hasAnyKeys(this.result, ['idpSigningCert', 'singleSignOnServices'])
  const expectedData = parseMetadata(this.xmlData)
  assert.deepStrictEqual(expectedData, this.result)
})

Then('It should throw Error', function () {
  assert.strictEqual(this.thrownErrors.length, 1)
  // @todo: specificError
  assert(this.thrownErrors[0] instanceof Error)
  this.thrownErrors = []
})
