const { Given, When, Before } = require('@cucumber/cucumber')
const axios = require('axios').default
const assert = require('assert')
const { validate } = require('fast-xml-parser')
const { mockGetUrlEndpoints} = require('../mocks/getFromUrlMocks')

Before(function () {
  mockGetUrlEndpoints()
})
Given('{string} is NOT acessible', function (remoteIdpUrl, done) {
  this.remoteIdpUrl = remoteIdpUrl
  axios.get(this.remoteIdpUrl).then(response => {
    this.response = response
    assert.strictEqual(response.status, 200)
    done()
  }).catch(err => {
    console.log(err)
    done()
  })
})

Given('{string} is acessible', function (remoteIdpUrl, done) {
  this.remoteIdpUrl = remoteIdpUrl
  axios.get(this.remoteIdpUrl).then(response => {
    this.response = response
    assert.strictEqual(response.status, 200)
    done()
  }
  ).catch(err => {
    console.log(err)
    done()
  })
})

Given('responds with XML', function () {
  assert(this.response.headers['content-type'].includes('xml'))
})

Given('downloaded XML data is valid', function () {
  assert(validate(this.response.data))
})

Given('downloaded XML data is NOT valid', function () {
  assert(!validate(this.response.data))
})

When('client call getFromUrl with the unacessible url', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending'
})

When('client call getFromUrl with valid url', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending'
})
