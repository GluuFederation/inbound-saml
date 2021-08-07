const { Given, When, Before } = require('@cucumber/cucumber')
const axios = require('axios').default
const assert = require('assert')
const { validate } = require('fast-xml-parser')
const { mockGetUrlEndpoints } = require('../mocks/getFromUrlMocks')
const { getFromUrl } = require('../../../../dist/get-saml-metadata/src/lib')

Before(function () {
  mockGetUrlEndpoints()
})
Given('{string} is NOT acessible', function (remoteIdpUrl, done) {
  this.remoteIdpUrl = remoteIdpUrl
  axios
    .get(this.remoteIdpUrl)
    .then((response) => {
      this.response = response
      assert.strictEqual(response.status, 200)
      done()
    })
    .catch((err) => {
      this.errr = err
      done()
    })
})

Given('{string} is acessible', function (remoteIdpUrl, done) {
  this.remoteIdpUrl = remoteIdpUrl
  axios
    .get(this.remoteIdpUrl)
    .then((response) => {
      this.response = response
      assert.strictEqual(response.status, 200)
      done()
    })
    .catch((err) => {
      this.errr = err
    })
})

Given('responds with XML', function () {
  assert(this.response.headers['content-type'].includes('xml'))
})

Given('downloaded XML data is valid', function () {
  assert(validate(this.response.data))
  this.xmlData = this.response.data
})

Given('downloaded XML data is NOT valid', function () {
  assert(validate(this.response.data) !== true)
})

When('client call getFromUrl with the unacessible url', function (done) {
  this.thrownErrors = []
  getFromUrl(this.remoteIdpUrl)
    .then((result) => {
      this.result = result
      done()
    })
    .catch((err) => {
      this.thrownErrors.push(err)
      done()
    })
})

When('client call getFromUrl with valid url', function (done) {
  this.thrownErrors = []
  getFromUrl(this.remoteIdpUrl)
    .then((result) => {
      this.result = result
      done()
    })
    .catch((err) => {
      this.thrownErrors.push(err)
      done()
    })
})
