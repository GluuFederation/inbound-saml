import { IMetadata } from "../protocols/IMetadataTypes"
import { parse } from 'fast-xml-parser'

interface IMetadataMapper {
  map: (xmlData: string) => IMetadata
}



export class MetadataMapperAdapter implements  IMetadataMapper {
  options = {
    ignoreAttributes: false
  }

  map (xmldata: string): IMetadata {
    
    
  }
}


describe('MetadataMapper', () => {
  describe('map', () => {
    it('should ')
  })
}