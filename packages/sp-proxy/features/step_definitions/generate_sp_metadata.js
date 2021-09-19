const { Given, Then, When } = require('@cucumber/cucumber')
const { default: axios } = require('axios')
const assert = require('assert')

Given('server is running', function (done) {
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0
  require('../../src/frameworks-drivers/main/server')
  axios
    .get('https://localhost/inbound-saml/sp/metadata')
    .then((result) => {
      assert(result.status === 200)
      done()
    })
    .catch((err) => {
      console.log(err)
      done()
    })
})
Given('proxy have valid configuration', function (done) {
  axios
    .get('https://localhost/inbound-saml/sp/metadata')
    .then((result) => {
      assert(result.status === 200)
      done()
    })
    .catch((err) => {
      console.log(err)
      done()
    })
})
When('{string} is called', function (url, done) {
  this.url = url
  axios.get(url).then((result) => {
    this.result = result
    done()
  })
})
Then(
  'endpoint should return metadata file according to configuration',
  function () {
    assert(this.result.data.includes('/inbound-saml/sp/callback'))
    assert(this.result.data.includes('/inbound-saml/sp/callback'))
    assert(this.result.data.includes('KeyDescriptor use="encryption"'))
    assert(this.result.data.includes('SPSSODescriptor'))
  }
)
