import * as parser from 'fast-xml-parser'
import { fakeMetadata } from '../../../testdata/fakes'
import { MetadataMapperAdapter } from './MetadataMapperAdapter'
jest.mock('fast-xml-parser')

const fakeXmlData = 'valid xml data'

const options = { ignoreAttributes: false }

describe('MetadataMapperAdapter', () => {
  describe('map', () => {
    it('should call getIdpssoDescriptor with correct params', () => {
      const sut = new MetadataMapperAdapter()
      const getIdpssoDescriptorSpy = jest.spyOn(MetadataMapperAdapter.prototype as any, 'getIdpssoDescriptor')
        .mockImplementationOnce(
          () => {
            return fakeMetadata.idpssoDescriptor
          }
        )
      sut.map(fakeXmlData)
      expect(getIdpssoDescriptorSpy).toHaveBeenCalledWith(fakeXmlData)
      expect(getIdpssoDescriptorSpy).toHaveBeenCalledTimes(1)
    })
  })
  describe('getIdpssoDescriptor', () => {
    it('should call fast-xml-parser parse with correct params', () => {
      const parseSpy = jest.spyOn(parser, 'parse').mockReturnValueOnce(
        {
          EntityDescriptor: fakeMetadata
        }
      )
      const sut = new MetadataMapperAdapter()
      sut.map(fakeXmlData)
      expect(parseSpy).toHaveBeenCalledTimes(1)
      expect(parseSpy).toHaveBeenCalledWith(fakeXmlData, options)
    })
  })
})
