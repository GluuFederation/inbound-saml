import { IKeyCertFormatter } from '@sp-proxy/interface-adapters/protocols/IKeySetFormatter'
import { BaseKeyCertFormatter } from '@sp-proxy/interface-adapters/utils/formatters/BaseKeyCertFormatter'

export class GenerateMetadataFormatter
  extends BaseKeyCertFormatter
  implements IKeyCertFormatter {}
