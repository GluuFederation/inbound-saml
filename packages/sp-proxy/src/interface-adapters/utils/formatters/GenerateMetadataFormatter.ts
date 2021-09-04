import { BaseKeyCertFormatter } from '@sp-proxy/use-cases/protocols/BaseKeyCertFormatter'
import { IKeyCertFormatter } from '@sp-proxy/use-cases/protocols/IKeySetFormatter'

export class GenerateMetadataFormatter
  extends BaseKeyCertFormatter
  implements IKeyCertFormatter {}
