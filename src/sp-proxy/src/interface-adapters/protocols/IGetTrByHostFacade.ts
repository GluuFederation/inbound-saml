import { IGetTrByHostResponse } from '@sp-proxy/interface-adapters/delivery/dtos/IGetTrByHostResponse'

export interface IGetTrByHostFacade {
  getTrByHost: (host: string) => Promise<IGetTrByHostResponse>
}
