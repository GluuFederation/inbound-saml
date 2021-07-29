import { XmlElement } from './XmlElement'

describe('XmlElement', () => {
  it('should get text', () => {
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
  describe('addNestedChilds', () => {
    it('should nest child elements sent as params', () => {
      const root = new XmlElement({})
      const entityDescriptor = new XmlElement({ name: 'EntityDescriptor' })
      const iDPSSODescriptor = new XmlElement({ name: 'IDPSSODescriptor' })
      const fakeValueTag = new XmlElement({ name: 'fakeValueTag' })

      root.addNestedChilds(entityDescriptor, iDPSSODescriptor, fakeValueTag)

      expect(root.childs[0].name).toBe('EntityDescriptor')
      expect(root.childs[0].childs[0].name).toBe('IDPSSODescriptor')
      expect(root.childs[0].childs[0].childs[0].name).toBe('fakeValueTag')
    })
  })
})
