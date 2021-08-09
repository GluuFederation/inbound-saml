import { BaseEntity } from '@sp-proxy/entities/types/BaseEntity'
import { IRequestModel } from '@sp-proxy/use-cases/io-models/IRequestModel'

export interface IMapper {
  map: (requestModel: IRequestModel<any>) => BaseEntity<any>
}
