import { makeSingleSignOnService } from '@sp-proxy/entities/factories/makeSingleSignOnService'
import { SingleSignOnService } from '@sp-proxy/entities/value-objects/SingleSignOnServices'
import { IService } from '@sp-proxy/use-cases/protocols/IService'

/**
 *
 * @param services Array of Services
 * @returns array of SingleSignOnServices value-objects
 */
export const makeSingleSignOnServices = (
  services: IService[]
): SingleSignOnService[] => {
  const ssoServicesVO = []
  for (const service of services) {
    ssoServicesVO.push(makeSingleSignOnService(service))
  }
  return ssoServicesVO
}
