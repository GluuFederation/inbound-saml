import { SingleSignOnService } from '@sp-proxy/entities/value-objects/SingleSignOnServices'

/**
 * Choose default Sso according to application rules:
 * 1st - HTTP-POST
 * 2nd - HTTP-Redirect
 * 3nd - Any (first index)
 * @param ssoServices
 * @returns {SingleSignOnService}
 */
export const pickDefaultSso = (
  ssoServices: SingleSignOnService[]
): SingleSignOnService => {
  const httpPost = ssoServices.find(
    (service) =>
      service.props.binding === 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST'
  )
  const httpRedirect = ssoServices.find(
    (service) =>
      service.props.binding ===
      'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect'
  )
  if (httpRedirect !== undefined) {
    return httpRedirect
  } else if (httpPost !== undefined) {
    return httpPost
  } else {
    return ssoServices[0]
  }
}
