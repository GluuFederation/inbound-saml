export interface IXmlElement {
  addChild: (xmlElement: IXmlElement) => void
  addNestedChilds: (...xmlElements: IXmlElement[]) => void
  childs: IXmlElement[]
  name: string
}
