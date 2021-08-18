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
    (service) => service.props.binding === 'HTTP-POST'
  )
  const httpRedirect = ssoServices.find(
    (service) => service.props.binding === 'HTTP-Redirect'
  )
  if (httpPost !== undefined) {
    return httpPost
  } else if (httpRedirect !== undefined) {
    return httpRedirect
  } else {
    return ssoServices[0]
  }
}
