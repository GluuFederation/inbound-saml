export interface IXmlMapper {
  map: (xmldata: string, composite: XmlElement) => IExternalData
}
