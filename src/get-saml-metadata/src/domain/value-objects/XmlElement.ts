import { IXmlElement } from '../protocols/IXmlElement'
import { XmlElementProps } from '../protocols/XmlElementProps'
import { ValueObject } from '../types/ValueObject'

export class XmlElement extends ValueObject<XmlElementProps> implements IXmlElement {
  private readonly _childs: IXmlElement[]
  constructor (
    props: XmlElementProps
  ) {
    super(props)
    this._childs = []
  }

  public addChild (xmlElement: IXmlElement): void {
    this._childs.push(xmlElement)
  }

  /**
   * add multiple nested childs, first param is higher hierarchy
   * @param xmlElements
   */
  public addNestedChilds (...xmlElements: IXmlElement[]): void {
    let parentElement
    for (let i = 0; i < xmlElements.length; i++) {
      const child = xmlElements[i]
      if (parentElement === undefined) {
        this.addChild(child)
        parentElement = child
      } else {
        parentElement.addChild(child)
        parentElement = child
      }
    }
  }

  public get childs (): IXmlElement[] {
    return this._childs
  }

  public get name (): string {
    if (this.props.name !== undefined) {
      return this.props.name
    } else {
      throw new Error('No name')
    }
  }

  public get text (): string {
    if (this.props.text !== undefined) {
      return this.props.text
    } else {
      throw new Error('No text')
    }
  }
}
