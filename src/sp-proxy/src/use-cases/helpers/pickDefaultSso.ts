import { SingleSignOnService } from '@sp-proxy/entities/value-objects/SingleSignOnServices'

export const pickDefaultSso = (
  ssoServices: SingleSignOnService[]
): SingleSignOnService => {
  const httpPost = ssoServices.find(
    (service) => service.props.binding === 'HTTP-POST'
  )
  if (httpPost !== undefined) {
    return httpPost
  } else {
    throw Error('not implemented')
  }
}
