import { makeSingleSignOnService } from '@sp-proxy/entities/factories/makeSingleSignOnService'
import { makeSingleSignOnServices } from '@sp-proxy/use-cases/factories/makeSingleSignOnServices'
import { pickDefaultSso } from '@sp-proxy/use-cases/helpers/pickDefaultSso'
import { IService } from '@sp-proxy/use-cases/protocols/IService'

describe('helper - pickDefaultSso', () => {
  const httpPost: IService = {
    binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
    location: 'any post location'
  }
  const httpRedirect: IService = {
    binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect',
    location: 'any redirexct location'
  }
  const httpPostSimplesign: IService = {
    binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST-SimpleSign',
    location: 'any simpleSign location'
  }
  const anyOtherService: IService = {
    binding: 'any-other-binding',
    location: 'any-other-location'
  }
  it('should pick HTTP-Redirect binding if exists', () => {
    const params = makeSingleSignOnServices([
      httpPost,
      httpRedirect,
      httpPostSimplesign,
      anyOtherService
    ])
    expect(pickDefaultSso(params)).toStrictEqual(
      makeSingleSignOnService(httpRedirect)
    )
  })
  it('should pick HTTP-POST if no HTTP-Redirect available', () => {
    const params = makeSingleSignOnServices([
      httpPostSimplesign,
      httpPost,
      anyOtherService
    ])
    expect(pickDefaultSso(params)).toStrictEqual(
      makeSingleSignOnService(httpPost)
    )
  })
  it('should pick first binding if no POST or REDIRECT available', () => {
    const params = makeSingleSignOnServices([
      httpPostSimplesign,
      anyOtherService
    ])
    expect(pickDefaultSso(params)).toStrictEqual(
      makeSingleSignOnService(httpPostSimplesign)
    )
  })
})
