// import { readFileSync } from 'fs'
// import { parseString } from 'xml2js'
import { FileIdpMetadata } from './FileIdpMetadata'
// jest.mock('./FileIdpMetadata')

describe('BaseIdpMetadata', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
  })
  afterEach(() => {
    jest.restoreAllMocks()
  })
  it('should call load on new object construction/instance', () => {
    // const spyClass = jest.spyOn(FileIdpMetadata, 'load')
    // const validFilePath = process.cwd() + '/src/testdata/shibIdpMetadata.xml'
    const loadSpy = jest.spyOn(FileIdpMetadata.prototype, 'load')
    const invalidFilePath = '/invalid/file/path/meta.xml'
    const fileIdpMetadata = new FileIdpMetadata({
      source: 'file',
      urlOrPath: invalidFilePath
    })
    expect(loadSpy).toHaveBeenCalledTimes(1)
  })
})
