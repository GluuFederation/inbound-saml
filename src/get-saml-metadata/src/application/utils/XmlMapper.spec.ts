import { XmlElement } from '../../domain/value-objects/XmlElement'
import { IExternalData } from '../protocols/IExternalData'
import * as parser from 'fast-xml-parser'
import { IXmlElement } from '../../domain/protocols/IXmlElement'
import { ValueObject } from '../../domain/types/ValueObject'
import { XmlMetadata } from '../../domain/value-objects/XmlMetadata'
import { XmlMapperAdapter } from './XmlMapperAdapter'

jest.mock('fast-xml-parser')

const fakeXmlElementComposite = (): XmlElement => {
  const fakeXmlElementComposite = new XmlElement({ name: 'fakeXmlElementComposite' })
  const fakeXmlElementChild = new XmlElement({ name: 'fakeXmlElementChild' })
  const fakeXmlElementGrandSon = new XmlElement({ name: 'fakeXmlElementGrandSon' })
  const fakeXmlElementGrandDaughter = new XmlElement({ name: 'fakeXmlElementGrandSon' })

  fakeXmlElementComposite.addNestedChilds(fakeXmlElementChild, fakeXmlElementGrandSon)
  fakeXmlElementChild.addChild(fakeXmlElementGrandDaughter)

  return fakeXmlElementComposite
}

const fakeXmlData = 'valid xml data'

describe('XmlMapperAdapter - fast-xml-parser', () => {
  describe('map', () => {
    it('should call parser with correct arguments', () => {
      const options = {
        ignoreAttributes: false
      }
      const xmlElementComposite = fakeXmlElementComposite()
      const fakeXmlData = '<root> valid data </root>'
      const xmlMapperAdapter = new XmlMapperAdapter()

      const parseSpy = jest.spyOn(parser, 'parse')
      xmlMapperAdapter.map(fakeXmlData, xmlElementComposite)
      expect(parseSpy).toHaveBeenCalledTimes(1)
    })
    it('should throw if parser throws', () => {
      const sut = new XmlMapperAdapter()
      const throwError = (): never => {
        throw new Error()
      }
      jest.spyOn(parser, 'parse').mockImplementationOnce(throwError)
      expect(
        () => { sut.map(fakeXmlData, fakeXmlElementComposite()) }
      ).toThrow()
    })
  })
})
