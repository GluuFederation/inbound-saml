import { IService } from '../../protocols/IService'
import { RemoteIdpMainModel } from '../main-models/RemoteIdpMainModel'

interface TRProps {
  id: string
  selectedSsoService: IService
  remoteIdp: RemoteIdpMainModel
}

export type ListTRsResponseUseCaseParams = TRProps[]
