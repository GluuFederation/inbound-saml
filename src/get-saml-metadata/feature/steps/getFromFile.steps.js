const { Given, When, Then } = require('@cucumber/cucumber')
const fs = require('fs')
const assert = require('assert')
const parser = require('fast-xml-parser')
const { getFromFile } = require('../../src/lib')

// parsed.EntityDescriptor.IDPSSODescriptor.KeyDescriptor[0]["ds:KeyInfo"]["ds:X509Data"]["ds:X509Certificate"]
// parsed.EntityDescriptor.IDPSSODescriptor.KeyDescriptor[0]["@_use"] === 'signing'

// SingleSignOnService
// list:: parsed.EntityDescriptor.IDPSSODescriptor.SingleSignOnService // array
// Binding:: parsed.EntityDescriptor.IDPSSODescriptor.SingleSignOnService[0]["@_Binding"]
// Location :: parsed.EntityDescriptor.IDPSSODescriptor.SingleSignOnService[0]["@_Location"]

const getIdpSigningCerts = (keyDescriptorList) => {
  const idpSigningCert = []
  for (const keyDescriptor of keyDescriptorList) {
    if (keyDescriptor['@_use'] === 'signing') {
      idpSigningCert.push(keyDescriptor['ds:KeyInfo']['ds:X509Data']['ds:X509Certificate'])
    }
  }
  return idpSigningCert
}

const getSingleSignOnServices = (rawSingleSignOnServiceList) => {
  const singleSignOnServices = []
  for (const rawSingleSignOnService of rawSingleSignOnServiceList) {
    singleSignOnServices.push(
      {
        binding: rawSingleSignOnService['@_Binding'],
        location: rawSingleSignOnService['@_Location']
      }
    )
  }
  return singleSignOnServices
}

const parseMetadata = (xmlData) => {
  const entityDescriptorPathModel = {
    EntityDescriptor: {
      IDPSSODescriptor: {
        KeyDescriptor: [
          {
            '@_use': 'signing',
            'ds:KeyInfo': {
              'ds:X509Data': {
                'ds:X509Certificate': 'valid_certificate'
              }
            }
          },
          {
            '@_use': 'signing',
            'ds:KeyInfo': {
              'ds:X509Data': {
                'ds:X509Certificate': 'second_valid_certificate'
              }
            }
          }
        ]
      }
    }
  }
  // keyDescriptorListMapping = 'EntityDescriptor.IDPSSODescriptor.KeyDescriptor'
  const options = {
    ignoreAttributes: false
  }
  const parsed = parser.parse(xmlData, options)
  const keyDescriptorList = parsed.EntityDescriptor.IDPSSODescriptor.KeyDescriptor
  // const mapping = ['ds:KeyInfo']['ds:X509Data']['ds:X509Certificate']
  const idpSigningCert = getIdpSigningCerts(keyDescriptorList)

  const rawSingleSignOnServiceList = parsed.EntityDescriptor.IDPSSODescriptor.SingleSignOnService
  const singleSignOnServices = getSingleSignOnServices(rawSingleSignOnServiceList)

  const data = {
    idpSigningCert: idpSigningCert,
    singleSignOnServices: singleSignOnServices
  }

  return data
}

Given('{string} exists in local file system', function (file) {
  // Write code here that turns the phrase above into concrete actions
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

Given('XML data is invalid', function () {
  this.xmlData = fs.readFileSync(this.filePath).toString()
  const IvalidXmlDataStub = '<root> This is invalid >root'
  let isValid
  if (this.filePath) {
    isValid = parser.validate(IvalidXmlDataStub)
  }
  assert.strictEqual(isValid.err.code, 'InvalidXml')
})

When('client call getFromFile with the valid file path', function () {
  this.thrownErrors = []
  try {
    this.data = getFromFile(this.filePath)
  } catch (err) {
    this.thrownErrors.push(err)
  }
})

When('client call getFromFile with the invalid file path', function () {
  this.thrownErrors = []
  try {
    this.data = getFromFile(this.filePath)
  } catch (err) {
    this.thrownErrors.push(err)
  }
})

Then('It should return a valid object with metadata values', function () {
  const expectedData = parseMetadata(this.xmlData)
  assert.deepStrictEqual(expectedData, this.result)
})

Then('It should throw a specific Error', function () {
  console.log(this.thrownErrors)
  assert.strictEqual(this.thrownErrors.length, 1)

  // @todo: specificError
  assert(this.thrownErrors[0] instanceof Error)
  this.thrownErrors = []
})
