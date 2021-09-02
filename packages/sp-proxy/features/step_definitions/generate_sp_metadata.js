const { Given, Then, When } = require('@cucumber/cucumber')
const { default: axios } = require('axios')
const assert = require('assert')

Given('server is running', function (done) {
  require('../../src/frameworks-drivers/main/server')
  axios
    .get('http://localhost:5000/sp/metadata')
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
    .get('http://localhost:5000/sp/metadata')
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
    assert(
      this.result.data.includes(
        'MIIFFjCCAv4CCQDFhyLx2QM/TTANBgkqhkiG9w0BAQsFADBNMQswCQYDVQQGEwJCUjELMAkGA1UECAwCU1AxCzAJBgNVBAcMAlNQMQ0wCwYDVQQKDARHbHV1MRUwEwYDVQQLDAxpbmJvdW5kLXNhbWwwHhcNMjEwODIzMTczNzM3WhcNMjIwODIzMTczNzM3WjBNMQswCQYDVQQGEwJCUjELMAkGA1UECAwCU1AxCzAJBgNVBAcMAlNQMQ0wCwYDVQQKDARHbHV1MRUwEwYDVQQLDAxpbmJvdW5kLXNhbWwwggIiMA0GCSqGSIb3DQEBAQUAA4ICDwAwggIKAoICAQDLk1dGOl7vIVAEavkpq8VXaFk0+9KT6DHE8ZNLAr2lKcYrJzMrU1EPWQHlhX6Wm8t6R6pvUi1N3SHRAmN50rcFyQLgU+Scq8OI0H0nt5+irR8MuQLadTaVhwyNJFV/1LKg6HvaMf3QejWQnNaYOY0USciBvhYqFj8f134AKGJR0jtIF6wtrsyW0u6F1/cGvjEufUhSAw+oQZNSfuYR8gSJImtcKz+Eq6cXZYQrXdhebMhr7A15Attlq95aL+QCef54IfvXf2yJtXhfxd734O1Tvzo9/2Vq8G7D854XQL6zYfZcaWdqAWy+sWuBRt7zDWFx49Y8TrCmetCESwN0limx0Mav6bXI/CAISN43RvBfbwyme5pekyB++refeq41+20VqxzoL8z+AhriUiqby0chmFEPTP3IdM+DGRh+pcoUQEchCFlGDr3zI4mKiRO1un5eguJKHLMWxyTs4b7SPIpdMuNiasUIP1KQYJSLdb8vxpXnrcSuZjjtritz4e4B5QoERQuBNUOwNUsj/O3yzWajZDPGPrzMbRxzo4RxobmkxbZNX0HgajGi9OMyYZMIb0eT/6Wi7fRUgN7kCYX0eYRU8F2HzfoTWWfqJIDZJHwvpfzMN4KtDtp7QYkOkTl+JEJjsD7pQC91uo7Xt0OVTdAz16M7WkgTVenI9NX/l8DYKwIDAQABMA0GCSqGSIb3DQEBCwUAA4ICAQA2vWeeBqDXK5ZMS6xTMKYArLgSBUJ57BxOjOIvzV/egZXFj979ATYMGWOCB4iyzKWLVufTZGupWtscLBi/M2W39wFd8nduKfBbF2/jReS1p8p5Np87AqPYDTYoImZ3dK9Q/YtGHCj0O/mvvJNuP5TJvv/rvTrz7opBY3n4wy3Bhu+63oX0PRW+Pt9Q8TXv7VGMi9QILYMPe4TM+6UhWWbJYwWJr8D/TIQC2t5qBCe/gob9oopgEijgwD075i60U7NlyDKSdXvqmDtIpnUgxEYh0/jVK5Mp3gaPcank58q+4VQRsJvzs96gcnKZDbHRxE9QMiKTlnPGfUWXE0LrEhVsw8bQMSOsIxE7O6AdTBZcEUYtMEhVsIrQqt0ZnYAGT+1llPLJKYuScI5AvfhBCpAfsSMq4ZPc0Arb9ulGEo8bkYcYAFtXkbOk5m7vEMsPLxtvXXnhjiag9RvGiDuOiO5GjLWdKAPcAGILnMw755rm2ow7998swevDhZ9YQ3yrDC7xMY2p/f/UGhqSlH6eOT/Amy5SjehQAHRZpBYzwcuw2eayTytFPepRRd/wKLE5RjbCB6To7mb7Ip3GCMDNGkXx6Nwlrr3/aL/kkbUEwl6+Ox10BnmQT0xVXfj9DupRGZhJnqgVPLHUxuX7ZkoLjU9nxADUZ6nNKIbQOQhACga3uQ=='
      )
    )
    assert(this.result.data.includes('/inbound-saml/sp/callback'))
    assert(this.result.data.includes('/inbound-saml/sp/callback'))
    assert(this.result.data.includes('KeyDescriptor use="encryption"'))
    assert(this.result.data.includes('SPSSODescriptor'))
  }
)
