import { IMetadataLoader } from '../../utils/IMetadataLoader'

export interface IMetadataLoadService {
  readonly urlOrPath: string
  readonly loader: IMetadataLoader
  load: () => string
}
