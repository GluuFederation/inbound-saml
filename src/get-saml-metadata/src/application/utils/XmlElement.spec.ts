import { ValueObject } from '../../domain/types/ValueObject'

interface XmlElementProps {
  name?: string
  atributes?: any
  text?: string
}

interface IXmlElement {
  addChild: (xmlElement: IXmlElement) => void
  childs: IXmlElement[]
  name: string
}

class XmlElement extends ValueObject<XmlElementProps> implements IXmlElement {
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

describe('XmlElement', () => {
  it('whatever too', () => {
    const iDPSSODescriptor = new XmlElement({ name: 'IDPSSODescriptor', text: 'text test' })
    expect(iDPSSODescriptor.text).not.toBeUndefined()
    expect(iDPSSODescriptor.text).toEqual('text test')
  })
  it('should add single child', () => {
    const root = new XmlElement({})
    const entityDescriptor = new XmlElement({ name: 'EntityDescriptor' })
    root.addChild(entityDescriptor)
    expect(root.childs.length).toBeGreaterThan(0)
    expect(root.childs).toContain(entityDescriptor)
  })
  it('should add nested composites', () => {
    const root = new XmlElement({})
    const entityDescriptor = new XmlElement({ name: 'EntityDescriptor' })
    const iDPSSODescriptor = new XmlElement({ name: 'IDPSSODescriptor' })
    const fakeValueTag = new XmlElement({ name: 'fakeValueTag' })

    root.addChild(entityDescriptor)
    entityDescriptor.addChild(iDPSSODescriptor)
    iDPSSODescriptor.addChild(fakeValueTag)
    expect(root.childs).toContain(entityDescriptor)
    expect(entityDescriptor.childs).toContain(iDPSSODescriptor)
    expect(iDPSSODescriptor.childs).toContain(fakeValueTag)
    expect(root.childs[0].name).toBe('EntityDescriptor')
    expect(root.childs[0].childs[0].name).toBe('IDPSSODescriptor')
    expect(root.childs[0].childs[0].childs[0].name).toBe('fakeValueTag')
  })
})
