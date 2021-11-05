import { GenerateMetadataResponseUseCaseParams } from '@sp-proxy/use-cases/io-models/response/GenerateMetadataResponseUseCaseParams'
import { IMapper } from '@sp-proxy/use-cases/protocols/IMapper'
import { IXmlData } from '@sp-proxy/use-cases/protocols/IXmlData'

export class GenerateMetadataUseCaseMapper
  implements IMapper<IXmlData, GenerateMetadataResponseUseCaseParams>
{
  map(xmldata: string): GenerateMetadataResponseUseCaseParams {
    return {
      xmldata: xmldata
    }
  }
}
