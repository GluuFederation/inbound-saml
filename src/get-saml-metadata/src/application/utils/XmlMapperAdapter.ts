import { parse } from 'fast-xml-parser'
import { IXmlElement } from '../../domain/protocols/IXmlElement'
import { IExternalData } from '../protocols/IExternalData'
import { IXmlMapper } from '../protocols/IXmlMapper'

export class XmlMapperAdapter implements IXmlMapper {
  options = {
    ignoreAttributes: false
  }

  map (xmldata: string, composite: IXmlElement): IExternalData {
    parse(xmldata, this.options)
    return {
      idpSigningCert: [],
      singleSignOnServices: []
    }
  }
}
